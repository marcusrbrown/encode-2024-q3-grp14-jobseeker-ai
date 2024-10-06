import {writeFile} from 'fs/promises'
import {join} from 'path'
import {NextRequest, NextResponse} from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const image = formData.get('image') as File | null

    if (!image) {
      return NextResponse.json({error: 'No image provided'}, {status: 400})
    }

    const bytes = await image.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const path = join('/tmp', image.name)
    await writeFile(path, buffer)

    // In a real-world scenario, you'd upload this file to a cloud storage
    // and return the URL. For this example, we'll return a dummy URL.
    const imageUrl = `https://example.com/images/${image.name}`

    return NextResponse.json({imageUrl})
  } catch (error) {
    console.error('Error uploading image:', error)
    return NextResponse.json({error: 'Failed to upload image'}, {status: 500})
  }
}
