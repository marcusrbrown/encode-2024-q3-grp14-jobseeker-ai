import {NextResponse, type NextRequest} from 'next/server'
import {OpenAI} from 'openai'

const openai = new OpenAI()

export async function POST(
  request: NextRequest,
  {params: {threadId}}: {params: {threadId: string}}
) {
  const {assistantId, content} = await request.json()

  const message = await openai.beta.threads.messages.create(threadId, {
    role: 'user',
    content
  })

  const stream = openai.beta.threads.runs.stream(threadId, {assistant_id: assistantId})

  return new NextResponse(stream.toReadableStream())
}
