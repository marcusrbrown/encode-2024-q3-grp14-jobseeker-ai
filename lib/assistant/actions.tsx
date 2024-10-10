'use server'

import OpenAI from 'openai'
import {FileObject} from 'openai/resources'

export async function updateThread(
  assistantId: string,
  threadId: string | null,
  userContent: string,
  attachments?: Partial<FileObject>[]
) {
  'use server'

  const openai = new OpenAI()

  if (!threadId) {
    // Create a thread if not provided
    const thread = await openai.beta.threads.create()
    threadId = thread.id
  }

  const hasAttachments = attachments && attachments.length > 0

  let thread = await openai.beta.threads.retrieve(threadId)
  if (hasAttachments && !thread.tool_resources?.file_search?.vector_store_ids) {
    // Create a vectorstore and add the attachments to it if available
    const {id: vectorStoreId} = await openai.beta.vectorStores.create({
      name: attachments[0].filename,
      file_ids: attachments
        .map(attachment => attachment.id)
        .filter((id): id is string => id !== undefined),
      expires_after: {
        anchor: 'last_active_at',
        days: 7
      }
    })

    thread = await openai.beta.threads.update(threadId, {
      tool_resources: {
        file_search: {
          vector_store_ids: [vectorStoreId]
        }
      }
    })
  }

  // Add a message to the thread
  await openai.beta.threads.messages.create(threadId, {
    role: 'user',
    content: userContent
  })

  // Create a run on the thread and stream the response
  const stream = await openai.beta.threads.runs.create(threadId, {
    assistant_id: assistantId,
    stream: true
  })

  return stream.toReadableStream()
}
