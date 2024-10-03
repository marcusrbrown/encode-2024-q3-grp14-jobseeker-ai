import React from 'react'
import {Upload} from 'lucide-react'

import {Input} from '@/components/ui/input'

export default function Sidebar() {
  return (
    <div className="lg:w-[30%] bg-card rounded-lg shadow-md p-6 space-y-6">
      <div className="border-2 border-dashed border-muted rounded-lg p-4 text-center">
        <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
        <p className="mt-2 text-sm text-muted-foreground">
          Drag and drop your resume here, or click to upload
        </p>
        <input type="file" className="hidden" />
      </div>
      <Input type="text" placeholder="Enter job description" />
      <Input type="text" placeholder="Enter company name" />
    </div>
  )
}
