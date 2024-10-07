import {NextRequest, NextResponse} from 'next/server'
import {OpenAI} from 'openai'

export async function POST(request: NextRequest) {
  try {
    const {image} = await request.json()

    if (!image) {
      return NextResponse.json({error: 'No image provided'}, {status: 400})
    }

    // Remove the data:image/png;base64, part
    const base64Image = image.replace(/^data:image\/png;base64,/, '')

    // Convert base64 to Buffer
    const imageBuffer = Buffer.from(base64Image, 'base64')

    // Check file size
    if (imageBuffer.length > 4 * 1024 * 1024) {
      return NextResponse.json({error: 'Image size exceeds 4 MB limit'}, {status: 400})
    }

    const response = await new OpenAI().images.createVariation({
      image: new File([imageBuffer], 'image.png', {type: 'image/png'}),
      n: 1,
      size: '1024x1024'
    })

    return NextResponse.json({enhancedImageUrl: response.data[0].url})
  } catch (error) {
    console.error('Error enhancing image:', error)
    return NextResponse.json(
      {
        error: 'Failed to enhance image',
        details: error instanceof Error ? error.message : String(error)
      },
      {status: 500}
    )
  }
}
