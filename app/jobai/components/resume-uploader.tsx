'use client'

import {useCallback, useEffect, useState} from 'react'
import {Upload} from 'lucide-react'

import {FileDetails} from '@/lib/types'

interface ResumeUploaderProps {
  threadId: string | null
}

export default function ResumeUploader({threadId}: ResumeUploaderProps) {
  const [files, setFiles] = useState<FileDetails[]>([])
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    const interval = setInterval(fetchFiles, 1000)
    return () => clearInterval(interval)
  }, [])

  const fetchFiles = useCallback(async () => {
    if (!threadId) return
    const response = await fetch(`/api/threads/${threadId}/files`)
    setFiles(await response.json())
  }, [threadId])

  const uploadFile = useCallback(
    async (file: File) => {
      const formData = new FormData()
      formData.append('file', file)
      await fetch(`/api/threads/${threadId}/files`, {
        method: 'POST',
        body: formData
      })
    },
    [threadId]
  )

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      await uploadFile(selectedFile)
    }
  }

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const droppedFile = event.dataTransfer.files?.[0]
    if (droppedFile) {
      await uploadFile(droppedFile)
    }
  }

  // Disable the container if threadId is missing
  const isDisabled = !threadId

  return (
    <div className={`flex justify-center ${isDisabled ? 'opacity-50 pointer-events-none' : ''}`}>
      <div
        className="border-2 border-dashed border-muted rounded-lg p-4 text-center"
        onDrop={handleDrop}
        onDragOver={e => e.preventDefault()}
      >
        <label
          htmlFor="file-upload"
          className={`font-semibold ${isDisabled ? 'pointer-events-none text-gray-400' : ''}`}
        >
          <Upload
            className={`mx-auto h-12 w-12 ${isDisabled ? 'text-gray-400' : 'text-muted-foreground'}`}
          />
          Drag and drop your resume here, or click to upload
        </label>
        <input
          type="file"
          id="file-upload"
          name="file-upload"
          className="hidden"
          onChange={handleFileChange}
          accept=".txt,.md,.pdf"
          disabled={isDisabled}
        />
      </div>
      <div className={`overflow-y-auto flex ${files.length > 0 ? 'flex-grow' : ''}`}>
        {files.map(file => (
          <div key={file.file_id} className="flex flex-col items-center">
            <p className="text-sm text-muted-foreground">{file.filename}</p>
            <p className="text-sm text-muted-foreground">{file.status}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
