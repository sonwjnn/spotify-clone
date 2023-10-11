'use client'

import AuthModal from '@/components/CustomModal/AuthModal'
import UploadSongModal from '@/components/CustomModal/UploadSongModal'
import { useEffect, useState } from 'react'
import SubscribeModal from '@/components/CustomModal/SubscribeModal'
import { ProductWithPrice } from '@/types/types'
import UploadPlaylistModal from '@/components/CustomModal/UploadPlaylistModal'

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
