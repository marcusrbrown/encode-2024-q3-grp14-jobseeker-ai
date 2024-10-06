export async function uploadImage(image: File): Promise<string> {
  const formData = new FormData()
  formData.append('image', image)

  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || 'Failed to upload image')
  }

  const {enhancedImageUrl} = await response.json()
  return enhancedImageUrl
}
