'use client'

import React, {useRef, useState} from 'react'
import {Sparkles} from 'lucide-react'

import {Alert, AlertDescription} from '@/components/ui/alert'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'

const MAX_FILE_SIZE = 4 * 1024 * 1024 // 4 MB

export default function ImageUploadForm() {
  const [preview, setPreview] = useState<string | null>(null)
  const [enhancedImage, setEnhancedImage] = useState<string | null>(null)
  const [isEnhancing, setIsEnhancing] = useState(false)
  const [enhanceError, setEnhanceError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const convertToPng = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          reject(new Error('Failed to get canvas context'))
          return
        }
        ctx.drawImage(img, 0, 0)
        canvas.toBlob(blob => {
          if (!blob) {
            reject(new Error('Failed to convert image to PNG'))
            return
          }
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result as string)
          reader.onerror = reject
          reader.readAsDataURL(blob)
        }, 'image/png')
      }
      img.onerror = reject
      img.src = URL.createObjectURL(file)
    })
  }

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        setEnhanceError('File size exceeds 4 MB limit. Please choose a smaller image.')
        return
      }
      try {
        const pngDataUrl = await convertToPng(file)
        setPreview(pngDataUrl)
        setEnhanceError(null)
      } catch (error) {
        console.error('Error converting image:', error)
        setEnhanceError('Failed to process the image. Please try another one.')
      }
    } else {
      setPreview(null)
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsEnhancing(true)
    setEnhanceError(null)
    setEnhancedImage(null)

    if (!preview) {
      setEnhanceError('Please select an image file.')
      setIsEnhancing(false)
      return
    }

    try {
      const enhanceResponse = await fetch('/api/enhance', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({image: preview})
      })
      if (!enhanceResponse.ok) throw new Error('Failed to enhance image')
      const {enhancedImageUrl} = await enhanceResponse.json()

      setEnhancedImage(enhancedImageUrl)
    } catch (error) {
      setEnhanceError('Failed to enhance image. Please try again.')
    } finally {
      setIsEnhancing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          disabled={isEnhancing}
          ref={fileInputRef}
        />
      </div>

      <div className={preview ? 'flex justify-between items-center gap-5' : 'hidden'}>
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
      </div>

      <div className="text-center">
        <Button type="submit" disabled={isEnhancing || !preview}>
          {isEnhancing ? 'Enhancing...' : 'Enhance Automatically'} <Sparkles className="h-3.5" />
        </Button>

        {enhanceError && (
          <Alert variant="destructive">
            <AlertDescription>{enhanceError}</AlertDescription>
          </Alert>
        )}
      </div>
    </form>
  )
}
