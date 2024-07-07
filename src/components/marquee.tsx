'use client'

import { useRef } from 'react'
import Marquee from 'react-fast-marquee'

import { useIsOverflow } from '@/hooks/use-is-overflow'

type MarqueeWrapperProps = {
  children: React.ReactNode
  pauseOnHover?: boolean
  speed?: number
  direction?: 'left' | 'right' | 'up' | 'down'
}

export const MarqueeWrapper = ({
  children,
  pauseOnHover = false,
  speed = 20,
  direction = 'left',
}: MarqueeWrapperProps) => {
  const marqueeRef = useRef<HTMLDivElement>(null)

  const isOverflow = useIsOverflow(marqueeRef)

  return (
    <div className="h-8 w-full" ref={marqueeRef}>
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
