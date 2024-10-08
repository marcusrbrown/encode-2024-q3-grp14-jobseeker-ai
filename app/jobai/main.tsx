'use client'

import React, {useState} from 'react'

import {uploadFile} from '@/lib/assistant/actions'
import {useAssistant} from '@/lib/hooks/use-assistant'
import ChatInterface from '@/app/jobai/components/chat-interface'
import FeaturesSection from '@/app/jobai/components/features-section'
import Footer from '@/app/jobai/components/footer'
import Header from '@/app/jobai/components/header'
import HeroSection from '@/app/jobai/components/hero-section'
import HowItWorksSection from '@/app/jobai/components/how-it-works-section'
import ProfileImageSection from '@/app/jobai/components/profile-image-section'
import ResumeUploader from '@/app/jobai/components/resume-uploader'

const assistantId = process.env.NEXT_PUBLIC_OPENAI_ASSISTANT_ID

export default function JobAssistantChatbot() {
  const [message, setMessage] = useState('')
  const {isLoading, messages, submitMessage} = useAssistant(assistantId!)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle message submission
    setMessage('')
  }

  const handleResumeUpload = async (name: string, content: string) => {
    const {id, name: filename} = await uploadFile(name, content)

    // Add a user message to begin the resume analysis with the attached document
    await submitMessage('Please begin.', [{id, filename}])
  }

  // TODO: Do something with isLoading (i.e. show a toast or spinner)
  // TODO: Do something with messages (i.e. display in chat interface)
  // TODO: Wire up handleSubmit to submitMessage

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <HeroSection />
      <main className="flex-grow w-full bg-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <ChatInterface message={message} setMessage={setMessage} handleSubmit={handleSubmit} />
            <ResumeUploader uploadContent={handleResumeUpload} />
          </div>
        </div>
      </main>
      <ProfileImageSection />
      <FeaturesSection />
      <HowItWorksSection />
      <Footer />
    </div>
  )
}
