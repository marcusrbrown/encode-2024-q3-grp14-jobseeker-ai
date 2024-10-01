import {redirect} from 'next/navigation'
import {auth} from '@/auth'

import {Session} from '@/lib/types'
import SignupForm from '@/components/signup-form'

export default async function SignupPage() {
  const session = (await auth()) as Session

  if (session) {
    redirect('/')
  }

  return (
    <main className="flex flex-col p-4">
      <SignupForm />
    </main>
  )
}
