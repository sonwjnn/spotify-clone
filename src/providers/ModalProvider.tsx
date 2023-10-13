'use client'

import { useEffect, useState } from 'react'

import AuthModal from '@/components/Modals/AuthModal'
import SubscribeModal from '@/components/Modals/SubscribeModal'
import UploadPlaylistModal from '@/components/Modals/UploadPlaylistModal'
import UploadSongModal from '@/components/Modals/UploadSongModal'
import type { ProductWithPrice } from '@/types/types'

interface ModalProviderProps {
  products: ProductWithPrice[]
}

const ModalProvider: React.FC<ModalProviderProps> = ({ products }) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <>
      <UploadPlaylistModal />
      <UploadSongModal />
      <AuthModal />
      <SubscribeModal products={products} />
    </>
  )
}

export default ModalProvider
