import React, {useRef, useState} from 'react'
import {Sparkles} from 'lucide-react'

import {Alert, AlertDescription} from '@/components/ui/alert'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'

export default function ProfileImage() {
  const [isEnhancing, setIsEnhancing] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [enhancedImage, setEnhancedImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setPreview(null)
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsEnhancing(true)
    setUploadError(null)
    setEnhancedImage(null)

    const file = fileInputRef.current?.files?.[0]
    if (!file) {
      setUploadError('Please select an image file.')
      setIsEnhancing(false)
      return
    }

    try {
      // Upload the image
      const formData = new FormData()
      formData.append('image', file)

      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })
      if (!uploadResponse.ok) throw new Error('Failed to upload image')
      const {imageUrl} = await uploadResponse.json()

      // Enhance the image
      const enhanceResponse = await fetch('/api/enhance', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({imageUrl})
      })
      if (!enhanceResponse.ok) throw new Error('Failed to enhance image')
      const {enhancedImageUrl} = await enhanceResponse.json()

      setEnhancedImage(enhancedImageUrl)
    } catch (error) {
      setUploadError('Failed to process image. Please try again.')
    } finally {
      setIsEnhancing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Label>Upload your image and let DALL-E work its magic </Label>
      <div>
        <Input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          disabled={isEnhancing}
          ref={fileInputRef}
        />
      </div>

      {preview && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Original Image</h2>
          <img src={preview} alt="Preview" className="max-w-full h-auto max-h-64 rounded-lg" />
        </div>
      )}

      {enhancedImage && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Enhanced Image</h2>
          <img
            src={enhancedImage}
            alt="Enhanced"
            className="max-w-full h-auto max-h-64 rounded-lg"
          />
        </div>
      )}

      <div className="text-center">
        <Button type="submit" disabled={isEnhancing || !preview}>
          {isEnhancing ? 'Enhancing... ' : `Enhance Automatically `} <Sparkles className="h-4" />
        </Button>
      </div>

      <div>
        {uploadError && (
          <Alert variant="destructive">
            <AlertDescription>{uploadError}</AlertDescription>
          </Alert>
        )}
      </div>
    </form>
  )
}
