'use client'

import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'
import { twMerge } from 'tailwind-merge'

interface ScrollbarProviderProps {
  children: React.ReactNode
  className?: string
  onScroll?: React.UIEventHandler<HTMLDivElement> | undefined
  scrollRef?: any
}

const ScrollbarProvider: React.FC<ScrollbarProviderProps> = ({
  children,
  className,
  onScroll,
  scrollRef,
}) => {
  return (
    <SimpleBar
      className={twMerge(`h-full w-full`, className)}
      onScroll={onScroll}
      ref={scrollRef}
    >
      {children}
    </SimpleBar>
  )
}

export default ScrollbarProvider
