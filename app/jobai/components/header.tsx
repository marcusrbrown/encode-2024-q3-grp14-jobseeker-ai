import React from 'react'
import {BriefcaseBusiness} from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-card shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <BriefcaseBusiness width={40} height={40} className="mx-3" />
          <span className="text-xl font-semibold text-primary">JobSeeker AI</span>
        </div>
      </div>
    </header>
  )
}
