'use client'

import { redirect } from 'next/navigation'

import Navbar from '@/components/Navbar'
import PageWrapper from '@/components/PageWrapper'
import { useUser } from '@/hooks/useUser'

const MainLayout = ({
  children,
}: {
  children: React.ReactNode
}): JSX.Element => {
  const { user, isLoading } = useUser()

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center rounded-lg bg-neutral-900">
        Loading user...
      </div>
    )
  }

  if (!user) {
    return redirect('/')
  }

  return (
    <PageWrapper>
      <Navbar type="home" />
      {children}
    </PageWrapper>
  )
}

export default MainLayout
