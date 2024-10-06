import {NextRequest, NextResponse} from 'next/server'
import {OpenAI} from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(request: NextRequest) {
  try {
    const {imageUrl} = await request.json()

    const response = await openai.images.edit({
      model: 'dall-e-2',
      image: imageUrl,
      prompt:
        'Enhance this image professionally. Improve lighting, color balance, and overall quality while maintaining the original composition.',
      n: 1,
      size: '1024x1024'
    })

    return NextResponse.json({enhancedImageUrl: response.data[0].url})
  } catch (error) {
    console.error('Error enhancing image:', error)
    return NextResponse.json({error: 'Failed to enhance image'}, {status: 500})
  }
}
