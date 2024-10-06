import React, {Suspense} from 'react'

import ProfileImage from '@/app/jobai/components/profile-image'

export default function ProfileImageSection() {
  return (
    <section className="bg-muted py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Enhance Your Profile Image</h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8">
          <Suspense fallback={<div>Loading...</div>}>
            <ProfileImage />
          </Suspense>
        </div>
      </div>
    </section>
  )
}
