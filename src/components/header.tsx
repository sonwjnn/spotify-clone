'use client'

import { usePalette } from 'color-thief-react'
import { memo, useEffect, useRef, useState } from 'react'

import { useComponentSize } from '@/store/use-component-size'
import { useHeader } from '@/store/use-header'
import { useLoadImage } from '@/hooks/use-load-image'
import { useMainLayout } from '@/store/use-main-layout'
import { useUser } from '@/hooks/use-user'
import type { Playlist } from '@/types/types'
import cn from '@/utils/cn'
import { buckets } from '@/utils/constants'

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
    const { userDetails } = useUser()
    const headerRef = useRef<HTMLDivElement>(null)

    const size = useComponentSize(headerRef)

    const [bgColorUser, setBgColorUser] = useState<string>('')

    const imageUrl = useLoadImage(userDetails?.avatar_url || '', buckets.users)

    const { data: dataColor } = usePalette(imageUrl as string, 10, 'hex', {
      crossOrigin: 'Anonymous',
      quality: 100,
    })

    useEffect(() => {
      setHeight(size.height)
    }, [size.height, setHeight])

    useEffect(() => {
      if (dataColor) {
        setBgColorUser(dataColor?.[2] ?? '#e0e0e0')
      }
    }, [dataColor])

    const headerStyles = {
      transition: 'background-color 1s ease',
      backgroundColor:
        // eslint-disable-next-line no-nested-ternary
        type === 'home'
          ? bgColorHeader
          : type === 'user'
            ? bgColorUser
            : bgColor || data?.bg_color,
    }

    return (
      <div
        className={cn(
          ` flex h-fit items-end justify-center p-6  pt-16 md:justify-start ${
            type === 'playlist' && width <= 768 ? '550px' : '340px'
          } `,
          className,
          {
            'header-bg-img-sm justify-center':
              type === 'playlist' || type === 'user',
            'header-bg-img-md justify-start': type === 'home',
          }
        )}
        style={headerStyles}
        ref={headerRef}
      >
        {children}
      </div>
    )
  }
)
