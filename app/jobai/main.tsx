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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle message submission
    setMessage('')
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
      <ProfileImageSection />
      <FeaturesSection />
      <HowItWorksSection />
      <Footer />
    </div>
  )
}
