import React from 'react'
import {GithubIcon, Linkedin, Twitter} from 'lucide-react'

const socialLinks = [
  {
    name: 'GitHub',
    icon: GithubIcon,
    url: 'https://github.com/marcusrbrown/encode-2024-q3-grp14-jobseeker-ai'
  },
  {name: 'Twitter', icon: Twitter, url: 'https://x.com/encodeclub'},
  {name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/school/encode-club'}
]

export default function Footer() {
  return (
    <footer className="bg-card text-card-foreground py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <p>&copy; 2024 JobAI (#Encode-2024-Q3-G14). All rights reserved.</p>
        </div>
        <div className="flex space-x-4">
          {socialLinks.map(social => (
            <a
              key={social.name}
              href={social.url}
              className="text-muted-foreground hover:text-primary"
            >
              <span className="sr-only">{social.name}</span>
              <social.icon className="h-6 w-6" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
