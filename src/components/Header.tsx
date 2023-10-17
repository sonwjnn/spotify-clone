'use client'

import { memo, useEffect, useRef } from 'react'

import { useComponentSize } from '@/hooks/use-component-size'
import { useHeader } from '@/stores/use-header'
import { useMainLayout } from '@/stores/use-main-layout'
import type { Playlist } from '@/types/types'
import cn from '@/utils/cn'

interface HeaderProps {
  children: React.ReactNode
  className?: string
  data?: Playlist
  bgColor?: string
  type?: string
}

// eslint-disable-next-line react/display-name
export const Header: React.FC<HeaderProps> = memo(
  ({ children, className, data, bgColor, type }) => {
    const { bgColor: bgColorHeader } = useHeader()
    const { setHeight } = useHeader()
    const { width } = useMainLayout()
    const headerRef = useRef<HTMLDivElement>(null)

    const size = useComponentSize(headerRef)

    useEffect(() => {
      setHeight(size.height)
    }, [size.height, setHeight])

    return (
      <div
        className={cn(
          ` h-fit flex justify-center md:justify-start items-end  p-6 pt-16 ${
            type === 'playlist' && width <= 768 ? '550px' : '340px'
          } `,
          className,
          {
            'justify-center header-bg-img-sm': type === 'playlist',
            'justify-start header-bg-img-md': type === 'home',
          }
        )}
        style={{
          transition: `background-color 1s ease`,
          backgroundColor: `${
            type === 'home' ? bgColorHeader : bgColor || data?.bg_color
          }`,
        }}
        ref={headerRef}
      >
        {children}
      </div>
    )
  }
)
