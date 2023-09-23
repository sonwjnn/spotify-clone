'use client'

import useHeaderNavigate from '@/stores/useHeaderNavigate'
import { useEffect } from 'react'

interface AccountWrapperProps {
	children: React.ReactNode
}

const AccountWrapper: React.FC<AccountWrapperProps> = ({ children }) => {
	const { handleScroll, setOpacity } = useHeaderNavigate()

	useEffect(() => {
		scrollTo(0, 0)
		setOpacity(0)
	}, [])

	return (
		<div
			onScroll={handleScroll}
			className='bg-neutral-900 rounded-lg w-full h-full overflow-hidden overflow-y-auto'
		>
			{children}
		</div>
	)
}

export default AccountWrapper
