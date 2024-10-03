import React from 'react'
import Image from 'next/image'
import {motion} from 'framer-motion'

import {Button} from '@/components/ui/button'

export default function HeroSection() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-background-unsplash.jpg"
          alt="Office background"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-white">
            Your AI-Powered Job Search Assistant
          </h1>
          <p className="text-xl mb-8 text-gray-200">
            Create, customize, and optimize your resume with the power of AI
          </p>
          <motion.div whileHover={{scale: 1.05}} whileTap={{scale: 0.95}}>
            <Button size="lg" variant="secondary">
              Get Started
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
