import React from 'react'
import {Facebook, Instagram, Linkedin, Twitter} from 'lucide-react'

const socialLinks = [
  {name: 'Facebook', icon: Facebook},
  {name: 'Twitter', icon: Twitter},
  {name: 'LinkedIn', icon: Linkedin},
  {name: 'Instagram', icon: Instagram}
]

export default function Footer() {
  return (
    <footer className="bg-card text-card-foreground py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <p>&copy; 2024 JobAI. All rights reserved.</p>
        </div>
        <div className="flex space-x-4">
          {socialLinks.map(social => (
            <a key={social.name} href="#" className="text-muted-foreground hover:text-primary">
              <span className="sr-only">{social.name}</span>
              <social.icon className="h-6 w-6" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
