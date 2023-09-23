'use client'

import useHeaderNavigate from '@/stores/useHeaderNavigate'
import { useEffect } from 'react'

interface HomeWrapperProps {
	children: React.ReactNode
}

const HomeWrapper: React.FC<HomeWrapperProps> = ({ children }) => {
	const { handleScroll, setOpacity } = useHeaderNavigate()

	useEffect(() => {
		setOpacity(0)
	}, [])

	return (
		<div
			onScroll={handleScroll}
			className='bg-neutral-900 rounded-lg h-full w-full overflow-y-auto [&::-webkit-scrollbar]:[width:0px]'
		>
			{children}
		</div>
	)
}

export default HomeWrapper
