'use client'

import {useState} from 'react'
import {Upload} from 'lucide-react'

interface ResumeUploaderProps {
  uploadContent: (name: string, content: string) => Promise<void>
}

export default function ResumeUploader({uploadContent}: ResumeUploaderProps) {
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const droppedFile = event.dataTransfer.files?.[0]
    if (droppedFile) {
      setFile(droppedFile)
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setIsUploading(true)
    try {
      const content = await readFileContent(file)
      await uploadContent(file.name, content)
    } catch (error) {
      console.error('Error uploading file:', error)
    } finally {
      setIsUploading(false)
    }
  }

  const readFileContent = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = event => resolve(event.target?.result as string)
      reader.onerror = error => reject(error)

      if (file.type === 'application/pdf') {
        reader.readAsArrayBuffer(file)
      } else {
        reader.readAsText(file)
      }
    })
  }

  return (
    <div className="lg:w-[30%] bg-card rounded-lg shadow-md p-6 space-y-6">
      <div
        className="border-2 border-dashed border-muted rounded-lg p-4 text-center"
        onDrop={handleDrop}
        onDragOver={e => e.preventDefault()}
      >
        <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
        <p className="mt-2 text-sm text-muted-foreground">
          {file ? file.name : 'Drag and drop your resume here, or click to upload'}
        </p>
        <input type="file" className="hidden" onChange={handleFileChange} accept=".txt,.md,.pdf" />
      </div>
      {file && (
        <button
          onClick={handleUpload}
          disabled={isUploading}
          className="w-full bg-primary text-primary-foreground rounded-md py-2"
        >
          {isUploading ? 'Uploading...' : 'Upload Resume'}
        </button>
      )}
    </div>
  )
}
