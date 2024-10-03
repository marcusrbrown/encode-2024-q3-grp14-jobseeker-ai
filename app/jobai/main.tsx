'use client'

import React, {useState} from 'react'

import ChatInterface from '@/app/jobai/components/chat-interface'
import FeaturesSection from '@/app/jobai/components/features-section'
import Footer from '@/app/jobai/components/footer'
import Header from '@/app/jobai/components/header'
import HeroSection from '@/app/jobai/components/hero-section'
import HowItWorksSection from '@/app/jobai/components/how-it-works-section'
import ProfileImageSection from '@/app/jobai/components/profile-image-section'
import Sidebar from '@/app/jobai/components/sidebar'

export default function JobAssistantChatbot() {
  const [message, setMessage] = useState('')
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [enhancedImage, setEnhancedImage] = useState<string | null>(null)

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

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <HeroSection />
      <main className="flex-grow w-full bg-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <ChatInterface message={message} setMessage={setMessage} handleSubmit={handleSubmit} />
            <Sidebar />
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
