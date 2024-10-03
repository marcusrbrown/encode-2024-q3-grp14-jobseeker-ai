import React from 'react'
import {motion} from 'framer-motion'
import {Briefcase, FileText, Search} from 'lucide-react'

const features = [
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
]

export default function FeaturesSection() {
  return (
    <section className="bg-background py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
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
  )
}
