'use client'

import Marquee from 'react-fast-marquee'
import { useRef } from 'react'
import useComponentSize from '@/hooks/useComponentSize'
import { useIsOverflow } from '@/hooks/useIsOverflow'

interface MarqueeWrapperProps {
  children: React.ReactNode
  pauseOnHover?: true
  speed?: number
  direction?: 'left' | 'right' | 'up' | 'down'
}

const MarqueeWrapper: React.FC<MarqueeWrapperProps> = ({
  children,
  pauseOnHover = false,
  speed = 20,
  direction = 'left',
}) => {
  const marqueeRef = useRef<HTMLDivElement>(null)

  const size = useComponentSize(marqueeRef)

  const isOverflow = useIsOverflow(marqueeRef)

  return (
    <div className="w-full h-8" ref={marqueeRef}>
      {isOverflow ? (
        <Marquee
          pauseOnHover={pauseOnHover}
          speed={speed}
          direction={direction}
        >
          {children}
        </Marquee>
      ) : (
        children
      )}
    </div>
  )
}

export default MarqueeWrapper
