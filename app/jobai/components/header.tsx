import React from 'react'

export default function Header() {
  return (
    <header className="bg-card shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <img src="https://placehold.co/40x40" alt="Logo" className="h-10 w-10 mr-2" />
          <span className="text-xl font-semibold text-primary">JobAI</span>
        </div>
      </div>
    </header>
  )
}
