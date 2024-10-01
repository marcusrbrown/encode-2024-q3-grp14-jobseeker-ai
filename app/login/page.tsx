import {redirect} from 'next/navigation'
import {auth} from '@/auth'

import {Session} from '@/lib/types'
import LoginForm from '@/components/login-form'

export default async function LoginPage() {
  const session = (await auth()) as Session

  if (session) {
    redirect('/')
  }

  return (
    <main className="flex flex-col p-4">
      <LoginForm />
    </main>
  )
}
