'use client'

import { usePalette } from 'color-thief-react'
import { memo, useEffect, useRef, useState } from 'react'

import { useComponentSize } from '@/hooks/use-component-size'
import { useUser } from '@/hooks/use-user'
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
    const { user } = useUser()
    const headerRef = useRef<HTMLDivElement>(null)

    const size = useComponentSize(headerRef)

    const [bgColorUser, setBgColorUser] = useState<string>('')

    const imageUrl = user?.user_metadata.avatar_url

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

    return (
      <div
        className={cn(
          ` h-fit flex justify-center md:justify-start items-end  p-6 pt-16 ${
            type === 'playlist' && width <= 768 ? '550px' : '340px'
          } `,
          className,
          {
            'justify-center header-bg-img-sm':
              type === 'playlist' || type === 'user',
            'justify-start header-bg-img-md': type === 'home',
          }
        )}
        style={{
          transition: `background-color 1s ease`,
          backgroundColor: `${
            // eslint-disable-next-line no-nested-ternary
            type === 'home'
              ? bgColorHeader
              : type === 'user'
              ? bgColorUser
              : bgColor || data?.bg_color
          }`,
        }}
        ref={headerRef}
      >
        {children}
      </div>
    )
  }
)
