'use client'

import { usePathname } from 'next/navigation'
import { memo, useEffect, useMemo, useRef, useState } from 'react'
import {
  HomeActiveIcon,
  HomeIcon,
  SearchActiveIcon,
  SearchIcon,
} from '@/public/icons'
import Box from './Box'
import { IconType } from 'react-icons'
import Link from 'next/link'
import Library from './Library'
import { Playlist } from '@/types/types'
import { twMerge } from 'tailwind-merge'
import usePlayingSidebar from '@/stores/usePlayingSidebar'
import ScrollbarProvider from '@/providers/ScrollbarProvider'

interface SidebarProps {
  playlists: Playlist[]
  className: string
}

interface SidebarItemProps {
  icons: IconType[]
  label: string
  active?: boolean
  href: string
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icons,
  label,
  active,
  href,
}) => {
  const Icon = active ? icons[0] : icons[1]
  return (
    <Link
      href={href}
      className={twMerge(
        `flex flex-row h-auto items-center w-full gap-x-4 text-base font-bold cursor-pointer hover:text-white transition text-neutral-400 py-1`,
        active && 'text-white'
      )}
    >
      <Icon size={26} />
      <p className="truncate w-full">{label}</p>
    </Link>
  )
}

const Sidebar: React.FC<SidebarProps> = ({ playlists, className }) => {
  const pathname = usePathname()

  const routes = useMemo(
    () => [
      {
        icons: [HomeActiveIcon, HomeIcon] as IconType[],
        label: 'Home',
        active: pathname === '/',
        href: '/',
      },
      {
        icons: [SearchActiveIcon, SearchIcon] as IconType[],
        label: 'Search',
        active: pathname === '/search',
        href: '/search',
      },
    ],
    [pathname]
  )

  const { isShowed } = usePlayingSidebar()

  const [isScroll, setScroll] = useState<boolean>(false)

  const scrollRef = useRef<any>()

  useEffect(() => {
    if (scrollRef.current) {
      const scrollElement = scrollRef.current.getScrollElement()

      const handleScroll = () => {
        const yAxis = scrollElement.scrollTop
        if (yAxis) {
          setScroll(true)
        } else {
          setScroll(false)
        }
      }

      scrollElement.addEventListener('scroll', handleScroll)

      return () => {
        scrollElement.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  return (
    <div
      className={twMerge(
        `hidden ${
          isShowed ? 'lg:flex' : 'md:flex'
        }  flex-col bg-black gap-y-2 h-full  py-2 pl-2`,
        className
      )}
    >
      <Box>
        <div className="flex flex-col gap-y-4 px-5 py-4">
          {routes.map(item => (
            <SidebarItem key={item.label} {...item} />
          ))}
        </div>
      </Box>
      <div className="h-full w-full bg-neutral-900 rounded-lg overflow-hidden">
        <Box className=" h-full ">
          <ScrollbarProvider scrollRef={scrollRef}>
            <Library playlists={playlists} isScroll={isScroll} />
          </ScrollbarProvider>
        </Box>
      </div>
    </div>
  )
}

export default memo(Sidebar)
