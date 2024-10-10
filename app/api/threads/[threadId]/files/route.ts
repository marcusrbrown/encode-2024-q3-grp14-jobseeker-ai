import {NextResponse, type NextRequest} from 'next/server'
import OpenAI from 'openai'

import type {FileDetails} from '@/lib/types'

const openai = new OpenAI()

export const runtime = 'edge'

export async function POST(
  request: NextRequest,
  {params: {threadId}}: {params: {threadId: string}}
) {
  const formData = await request.formData()
  const file = formData.get('file') as File

  if (!file) {
    return NextResponse.json({error: 'No file uploaded'}, {status: 400})
  }

  try {
    const {filename, id: fileId} = await openai.files.create({
      file,
      purpose: 'assistants'
    })

    const vectorStoreId = await getVectorStore(threadId)
    const vectorFile = await openai.beta.vectorStores.files.create(vectorStoreId, {
      file_id: fileId
    })

    return NextResponse.json({
      file_id: fileId,
      filename,
      status: vectorFile.status
    } as FileDetails)
  } catch (error) {
    return NextResponse.json({error: 'Error uploading file'}, {status: 500})
  }
}

export async function GET(_: NextRequest, {params: {threadId}}: {params: {threadId: string}}) {
  try {
    const vectorStoreId = await getVectorStore(threadId)
    const files = await openai.beta.vectorStores.files.list(vectorStoreId)
    const fileDetails = await Promise.all(
      files.data.map(async file => {
        const fileObject = await openai.files.retrieve(file.id)
        const vectorFile = await openai.beta.vectorStores.files.retrieve(vectorStoreId, file.id)

        return {
          file_id: file.id,
          filename: fileObject.filename,
          status: vectorFile.status
        } as FileDetails
      })
    )

    return NextResponse.json(fileDetails)
  } catch (error) {
    return NextResponse.json({error: 'Error retrieving files'}, {status: 500})
  }
}

export async function DELETE(
  request: NextRequest,
  {params: {threadId}}: {params: {threadId: string}}
) {
  const {fileId} = await request.json()

  if (!fileId) {
    return NextResponse.json({error: 'No file ID provided'}, {status: 400})
  }

  try {
    const vectorStoreId = await getVectorStore(threadId)
    await openai.beta.vectorStores.files.del(vectorStoreId, fileId)

    // await openai.beta.threads.messages.create(threadId, {
    //   role: 'assistant',
    //   content: `File ${fileId} has been removed`
    // })

    return new NextResponse()
  } catch (error) {
    return NextResponse.json({error: 'Error deleting file'}, {status: 500})
  }
}

async function getVectorStore(threadId: string) {
  const thread = await openai.beta.threads.retrieve(threadId)

  if (
    thread.tool_resources?.file_search?.vector_store_ids &&
    thread.tool_resources.file_search.vector_store_ids.length > 0
  ) {
    return thread.tool_resources.file_search.vector_store_ids[0]
  }

  const {id: vectorStoreId} = await openai.beta.vectorStores.create({
    name: `vector-store-${threadId}-resume-assistant`,
    expires_after: {
      anchor: 'last_active_at',
      days: 7
    }
  })

  await openai.beta.threads.update(threadId, {
    tool_resources: {
      file_search: {
        vector_store_ids: [vectorStoreId]
      }
    }
  })

  return vectorStoreId
}
