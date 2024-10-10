import {NextResponse} from 'next/server'

import {openai} from '@/lib/openai'

export async function POST() {
  try {
    const thread = await openai.beta.threads.create()
    return NextResponse.json({threadId: thread.id}, {status: 201})
  } catch (error) {
    return NextResponse.json({error: 'Failed to create thread'}, {status: 500})
  }
}
