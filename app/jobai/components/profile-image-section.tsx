import React from 'react'
import {ImageIcon} from 'lucide-react'

import {Button} from '@/components/ui/button'
import {Label} from '@/components/ui/label'

interface ProfileImageSectionProps {
  profileImage: string | null
  enhancedImage: string | null
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleEnhanceImage: () => void
}

export default function ProfileImageSection({
  profileImage,
  enhancedImage,
  handleImageUpload,
  handleEnhanceImage
}: ProfileImageSectionProps) {
  return (
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
  )
}
