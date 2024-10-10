'use client'

import React from 'react'

import FeaturesSection from '@/app/jobai/components/features-section'
import Footer from '@/app/jobai/components/footer'
import Header from '@/app/jobai/components/header'
import HeroSection from '@/app/jobai/components/hero-section'
import HowItWorksSection from '@/app/jobai/components/how-it-works-section'
import ProfileImageSection from '@/app/jobai/components/profile-image-section'
import ResumeAnalyzer from '@/app/jobai/components/resume-analyzer'

export default function JobAssistantChatbot() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <HeroSection />
      <main className="flex-grow w-full bg-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ResumeAnalyzer />
        </div>
      </main>
      <ProfileImageSection />
      <FeaturesSection />
      <HowItWorksSection />
      <Footer />
    </div>
  )
}
