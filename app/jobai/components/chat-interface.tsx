import React from 'react'

import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'

interface ChatInterfaceProps {
  message: string
  setMessage: (message: string) => void
  handleSubmit: (e: React.FormEvent) => void
}

export default function ChatInterface({message, setMessage, handleSubmit}: ChatInterfaceProps) {
  return (
    <div className="lg:w-[70%] bg-card rounded-lg shadow-md p-6">
      <div className="h-96 overflow-y-auto mb-4 space-y-4">
        {/* Sample messages */}
        <div className="flex justify-end">
          <div className="bg-primary/10 text-primary rounded-lg py-2 px-4 max-w-xs">
            Hello, I need help with my resume.
          </div>
        </div>
        <div className="flex justify-start">
          <div className="bg-muted text-muted-foreground rounded-lg py-2 px-4 max-w-xs">
            Hi there! I'd be happy to help you with your resume. What specific area would you like
            assistance with?
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="flex items-center">
        <Input
          type="text"
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Type your message here..."
          className="flex-grow rounded-r-none"
        />
        <Button type="submit" className="rounded-l-none">
          Send
        </Button>
      </form>
    </div>
  )
}
