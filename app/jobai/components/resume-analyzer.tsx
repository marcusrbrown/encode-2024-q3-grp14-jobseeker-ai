import React, {ChangeEvent, useState} from 'react'
import {Sparkles} from 'lucide-react'

import {Button} from '@/components/ui/button'
import {Card} from '@/components/ui/card'
import {Input} from '@/components/ui/input'

interface Message {
  text: string
  sender: 'user' | 'assistant'
}

const ResumeAnalyzer: React.FC = () => {
  const [file, setFile] = useState<File | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  const handleAnalyze = () => {
    if (!file) {
      alert('Please upload a resume first.')
      return
    }
    setIsLoading(true)
    // Simulating API call
    setTimeout(() => {
      setMessages(prevMessages => [
        ...prevMessages,
        {text: 'Please begin [resume analysis]', sender: 'user'}
      ])
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="flex flex-col space-y-4 p-4">
      <Card className="p-4 space-y-4">
        <h2 className="text-3xl font-bold text-center mb-5">Upload your resume here</h2>
        <Input type="file" onChange={handleFileChange} accept=".pdf" />
        <Button onClick={handleAnalyze} disabled={isLoading} className="w-full">
          {isLoading ? 'Analyzing...' : 'Analyze'} <Sparkles className="h-3.5" />
        </Button>
      </Card>

      <Card className="p-4 h-64 overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-2 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}
          >
            <span className="inline-block bg-gray-200 rounded px-2 py-1">{message.text}</span>
          </div>
        ))}
      </Card>
    </div>
  )
}

export default ResumeAnalyzer
