'use client'

import ScrollbarProvider from '@/providers/ScrollbarProvider'
import useHeaderNavigate from '@/stores/useHeaderNavigate'
import { useEffect, useRef } from 'react'

interface SearchWrapperProps {
	children: React.ReactNode
}

const SearchWrapper: React.FC<SearchWrapperProps> = ({ children }) => {
	const { setOpacity } = useHeaderNavigate()

	const scrollRef = useRef<any>()

	useEffect(() => {
		setOpacity(0)
	}, [])

	useEffect(() => {
		if (scrollRef.current) {
			const { current: scrollCurrent } = scrollRef
			scrollCurrent.getScrollElement().onscroll = (e) => {
				const yAxis = scrollCurrent.getScrollElement().scrollTop

				if (yAxis > 120) {
					setOpacity(1)
				} else setOpacity(yAxis / 120)
			}
		}
	}, [])

	return (
		<div className='h-full w-full bg-neutral-900 rounded-lg overflow-hidden'>
			<ScrollbarProvider scrollRef={scrollRef}>
				{children}
			</ScrollbarProvider>
		</div>
	)
}

export default SearchWrapper
