import React from 'react'
import {motion} from 'framer-motion'

import {Button} from '@/components/ui/button'

export default function HeroSection() {
  return (
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
  )
}
