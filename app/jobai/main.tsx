'use client'

import React, {useState} from 'react'
import {motion} from 'framer-motion'
import {ArrowRight, Briefcase, FileText, Image as ImageIcon, Search, Upload} from 'lucide-react'

import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'

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
      {/* Header */}
      <header className="bg-card shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <img src="https://placehold.co/40x40" alt="Logo" className="h-10 w-10 mr-2" />
            <span className="text-xl font-semibold text-primary">JobAI</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Your AI-Powered Job Search Assistant</h1>
          <p className="text-xl mb-8">
            Create, customize, and optimize your resume with the power of AI
          </p>
          <motion.div whileHover={{scale: 1.05}} whileTap={{scale: 0.95}}>
            <Button size="lg" variant="secondary">
              Get Started
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-grow w-full bg-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Chat Interface */}
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
                    Hi there! I'd be happy to help you with your resume. What specific area would
                    you like assistance with?
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

            {/* Sidebar */}
            <div className="lg:w-[30%] bg-card rounded-lg shadow-md p-6 space-y-6">
              <div className="border-2 border-dashed border-muted rounded-lg p-4 text-center">
                <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">
                  Drag and drop your resume here, or click to upload
                </p>
                <input type="file" className="hidden" />
              </div>
              <Input type="text" placeholder="Enter job description" />
              <Input type="text" placeholder="Enter company name" />
            </div>
          </div>
        </div>
      </main>

      {/* Profile Image Section */}
      <section className="bg-muted py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Enhance Your Profile Image</h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
            <div className="w-full md:w-1/2 lg:w-1/3 bg-card rounded-lg shadow-md p-6 space-y-6">
              <div className="border-2 border-dashed border-muted rounded-lg p-4 text-center">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="mx-auto h-48 w-48 rounded-full object-cover"
                  />
                ) : (
                  <ImageIcon className="mx-auto h-24 w-24 text-muted-foreground" />
                )}
                <p className="mt-2 text-sm text-muted-foreground">
                  {profileImage ? 'Click to change image' : 'Upload your profile image'}
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="profile-image-upload"
                />
                <Label htmlFor="profile-image-upload" className="mt-2 inline-block">
                  <Button variant="outline" size="sm" type="button">
                    {profileImage ? 'Change Image' : 'Upload Image'}
                  </Button>
                </Label>
              </div>
              {profileImage && !enhancedImage && (
                <Button onClick={handleEnhanceImage} className="w-full">
                  Enhance Automatically
                </Button>
              )}
            </div>
            {enhancedImage && (
              <div className="w-full md:w-1/2 lg:w-1/3 bg-card rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4 text-center">Enhanced Image</h3>
                <img
                  src={enhancedImage}
                  alt="Enhanced Profile"
                  className="mx-auto h-48 w-48 rounded-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-background py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: FileText,
                title: 'AI-Powered Resume Creation',
                description: 'Create professional resumes tailored to your skills and experience'
              },
              {
                icon: Briefcase,
                title: 'Smart Resume Customization',
                description: 'Optimize your resume for specific job descriptions and companies'
              },
              {
                icon: Search,
                title: 'Job Search Strategies',
                description: 'Get expert advice on job search techniques and interview preparation'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: index * 0.2}}
                className="bg-card rounded-lg shadow-md p-6 text-center"
              >
                <feature.icon className="mx-auto h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 md:space-x-4">
            {[
              {step: 1, text: 'Upload your existing resume or start from scratch'},
              {step: 2, text: 'Provide job description and company details'},
              {step: 3, text: 'Receive tailored resume and job search advice'}
            ].map((item, index) => (
              <React.Fragment key={index}>
                <div className="flex flex-col items-center text-center">
                  <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mb-4">
                    {item.step}
                  </div>
                  <p className="text-muted-foreground max-w-xs">{item.text}</p>
                </div>
                {index < 2 && (
                  <ArrowRight className="hidden md:block text-primary h-8 w-8 transform translate-y--6" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card text-card-foreground py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p>&copy; 2024 JobAI. All rights reserved.</p>
            <div className="mt-2">
              <a href="#" className="text-muted-foreground hover:text-primary mr-4">
                Privacy Policy
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                Terms of Service
              </a>
            </div>
          </div>
          <div className="flex space-x-4">
            {['facebook', 'twitter', 'linkedin', 'instagram'].map(social => (
              <a key={social} href="#" className="text-muted-foreground hover:text-primary">
                <span className="sr-only">{social}</span>
                <img
                  src={`/placeholder.svg?height=24&width=24&text=${social}`}
                  alt={social}
                  className="h-6 w-6"
                />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
