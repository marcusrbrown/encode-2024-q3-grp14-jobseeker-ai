import React from 'react'
import {ArrowRight} from 'lucide-react'

const steps = [
  {step: 1, text: 'Upload your existing resume or start from scratch'},
  {step: 2, text: 'Provide job description and company details'},
  {step: 3, text: 'Receive tailored resume and job search advice'}
]

export default function HowItWorksSection() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 md:space-x-4">
          {steps.map((item, index) => (
            <React.Fragment key={index}>
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mb-4">
                  {item.step}
                </div>
                <p className="text-muted-foreground max-w-xs">{item.text}</p>
              </div>
              {index < steps.length - 1 && (
                <ArrowRight className="hidden md:block text-primary h-8 w-8 transform translate-y--6" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}
