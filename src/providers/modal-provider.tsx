'use client'

import { useEffect, useState } from 'react'

import { AuthModal } from '@/components/modals/auth-modal'
import { EditUserModal } from '@/components/modals/edit-user-modal'
import { SubscribeModal } from '@/components/modals/subcribe-modal'
import { UploadPlaylistModal } from '@/components/modals/upload-playlist-modal'
import { UploadSongModal } from '@/components/modals/upload-song-modal'
import type { ProductWithPrice } from '@/types/types'

interface ModalProviderProps {
  products: ProductWithPrice[]
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ products }) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <>
      <EditUserModal />
      <UploadPlaylistModal />
      <UploadSongModal />
      <AuthModal />
      <SubscribeModal products={products} />
    </>
  )
}
