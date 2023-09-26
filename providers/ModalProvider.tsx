'use client'

import AuthModal from '@/components/AuthModal'
import UploadSongModal from '@/components/UploadSongModal'
import { useEffect, useState } from 'react'
import SubscribeModal from '@/components/SubscribeModal'
import { ProductWithPrice } from '@/types'
import UploadPlaylistModal from '@/components/UploadPlaylistModal'

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
