import {GeistMono} from 'geist/font/mono'
import {GeistSans} from 'geist/font/sans'

import '@/app/globals.css'

import {cn} from '@/lib/utils'
import {Toaster} from '@/components/ui/sonner'
import {Providers} from '@/components/providers'
import JobAssistantChatbot from '@/app/jobai/main'

export const metadata = {
  metadataBase: process.env.VERCEL_URL ? new URL(`https://${process.env.VERCEL_URL}`) : undefined,
  title: {
    default: 'JobAI',
    template: `%s - AI Chatbot for Job Seekers`
  },
  description: 'AI Chatbot for Job Seekers.',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png'
  }
}

export const viewport = {
  themeColor: [
    {media: '(prefers-color-scheme: light)', color: 'white'},
    {media: '(prefers-color-scheme: dark)', color: 'black'}
  ]
}

export default function RootLayout() {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('font-sans antialiased', GeistSans.variable, GeistMono.variable)}>
        <Toaster position="top-center" />
        <Providers attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <main className="flex flex-col flex-1 bg-muted/50">
            <JobAssistantChatbot />
          </main>
        </Providers>
      </body>
    </html>
  )
}
