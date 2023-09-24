'use client'

import useHeaderNavigate from '@/stores/useHeaderNavigate'
import { useEffect, useRef } from 'react'
import ScrollbarProvider from '@/providers/ScrollbarProvider'

interface HomeWrapperProps {
	children: React.ReactNode
}

const HomeWrapper: React.FC<HomeWrapperProps> = ({ children }) => {
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
		<div className='bg-neutral-900 h-full w-full rounded-lg overflow-hidden relative'>
			<ScrollbarProvider scrollRef={scrollRef}>
				{children}
			</ScrollbarProvider>
		</div>
	)
}

export default HomeWrapper
