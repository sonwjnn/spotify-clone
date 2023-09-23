'use client'

import useHeaderNavigate from '@/stores/useHeaderNavigate'
import { useEffect } from 'react'

interface SearchWrapperProps {
	children: React.ReactNode
}

const SearchWrapper: React.FC<SearchWrapperProps> = ({ children }) => {
	const { handleScroll, setOpacity } = useHeaderNavigate()

	useEffect(() => {
		scrollTo(0, 0)
		setOpacity(0)
	}, [])

	return (
		<div
			onScroll={handleScroll}
			className='bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:[width:0px]'
		>
			{children}
		</div>
	)
}

export default SearchWrapper
