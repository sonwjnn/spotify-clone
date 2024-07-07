'use client'

import { useEffect, useState } from 'react'

import { AuthModal } from '@/components/modals/auth-modal'
import { EditPlaylistModal } from '@/components/modals/edit-playlist-modal'
import { EditUserModal } from '@/components/modals/edit-user-modal'
import { SubscribeModal } from '@/components/modals/subcribe-modal'
import { UploadSongModal } from '@/components/modals/upload-song-modal'
import type { ProductWithPrice } from '@/types/types'

type ModalProviderProps = {
  products: ProductWithPrice[]
}

export const ModalProvider = ({ products }: ModalProviderProps) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <>
      <EditUserModal />
      <EditPlaylistModal />
      <UploadSongModal />
      <AuthModal />
      <SubscribeModal products={products} />
    </>
  )
}
