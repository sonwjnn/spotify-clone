'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import Alert from '@/components/Alert'
import PageWrapper from '@/components/PageWrapper'
import { useUser } from '@/hooks/useUser'

interface PlaylistLayoutProps {
  children: React.ReactNode
}

const PlaylistLayout: React.FC<PlaylistLayoutProps> = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const router = useRouter()

  const { user, isLoading, subscription } = useUser()
  useEffect(() => {
    if (!isLoading && !user && !subscription) {
      router.replace('/')
    }
  }, [isLoading, user, router, subscription])
  return (
    <>
      {user && subscription ? (
        <PageWrapper>{children}</PageWrapper>
      ) : (
        <Alert type="noAuth" />
      )}
    </>
  )
}

export default PlaylistLayout
