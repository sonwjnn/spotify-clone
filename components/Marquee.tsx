'use client'

import Marquee from 'react-fast-marquee'
import { useEffect, useRef, useState } from 'react'
import useComponentSize from '@/hooks/useComponentSize'

interface MarqueeWrapperProps {
	children: React.ReactNode
	pauseOnHover?: true
	speed?: number
	direction?: 'left' | 'right' | 'up' | 'down'
}

const MarqueeWrapper: React.FC<MarqueeWrapperProps> = (
	{ children, pauseOnHover = false, speed = 20, direction = 'left' },
) => {
	const [isOverflow, setOverflow] = useState(false)

	const marqueeRef = useRef<HTMLDivElement>(null)

	const size = useComponentSize(marqueeRef)

	const [previousHeight, setPreviousHeight] = useState(size.height)

	useEffect(() => {
		if (size.height > previousHeight) {
			console.log(size.height, previousHeight)
			setOverflow(true)
		}
	}, [size.height, previousHeight])

	return (
		<div ref={marqueeRef}>
			{isOverflow
				? (
					<Marquee
						pauseOnHover={pauseOnHover}
						speed={speed}
						direction={direction}
					>
						{children}
					</Marquee>
				)
				: children}
		</div>
	)
}

export default MarqueeWrapper
