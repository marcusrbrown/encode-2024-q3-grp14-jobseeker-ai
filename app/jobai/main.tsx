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
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [enhancedImage, setEnhancedImage] = useState<string | null>(null)
  const {isLoading, messages, submitMessage} = useAssistant(assistantId!)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle message submission
    setMessage('')
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result as string)
        setEnhancedImage(null) // Reset enhanced image when a new image is uploaded
      }
      reader.readAsDataURL(file)
    }
  }

  const handleEnhanceImage = async () => {
    if (profileImage) {
      // Placeholder for DALL-E API call
      console.log('Enhancing image with DALL-E...')
      // Simulating API delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      // For demonstration, we're just using the same image
      setEnhancedImage(profileImage)
    }
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
      <ProfileImageSection
        profileImage={profileImage}
        enhancedImage={enhancedImage}
        handleImageUpload={handleImageUpload}
        handleEnhanceImage={handleEnhanceImage}
      />
      <FeaturesSection />
      <HowItWorksSection />
      <Footer />
    </div>
  )
}
