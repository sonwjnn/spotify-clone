'use client'

import AuthModal from '@/components/AuthModal'
import UploadModal from '@/components/UploadModal'
import { useEffect, useState } from 'react'
import SubscribeModal from '@/components/SubscribeModal'
import { ProductWithPrice } from '@/types'

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
			<UploadModal />
			<AuthModal />
			<SubscribeModal products={products} />
		</>
	)
}

export default ModalProvider
