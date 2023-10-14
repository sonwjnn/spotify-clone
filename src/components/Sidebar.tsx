'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { memo, useMemo, useState } from 'react'
import type { IconType } from 'react-icons'
import { twMerge } from 'tailwind-merge'

import {
  HomeActiveIcon,
  HomeIcon,
  type IconProps,
  SearchActiveIcon,
  SearchIcon,
} from '@/public/icons'
import useLibraryStore from '@/stores/useLibraryStore'
import usePlayingSidebar from '@/stores/usePlayingSidebar'
import type { Playlist } from '@/types/types'

import Library from './Library'
import { ResizeBox } from './ResizeBox'
import Box from './ui/Box'
import { ScrollArea } from './ui/scroll-area'

interface SidebarProps {
  playlists: Playlist[]
  className?: string
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
  const { isCollapsed } = useLibraryStore()
  const Icon: ((props: Partial<IconProps>) => JSX.Element) | undefined = active
    ? icons[0]
    : icons[1]
  return (
    <Link
      href={href}
      className={twMerge(
        `flex flex-row h-auto items-center w-full gap-x-4 text-base font-bold cursor-pointer hover:text-white transition text-neutral-400 py-1 pl-1`,
        active && 'text-white'
      )}
    >
      <div className="h-6 w-6">{Icon ? <Icon /> : null}</div>

      {!isCollapsed && <p className="w-full truncate">{label}</p>}
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
        active: pathname.includes('/search'),
        href: '/search',
      },
    ],
    [pathname]
  )

  const { isShowed } = usePlayingSidebar()

  const [isScroll, setScroll] = useState<boolean>(false)

  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>): void => {
    const yAxis = e.currentTarget.scrollTop
    if (yAxis) {
      setScroll(true)
    } else {
      setScroll(false)
    }
  }

  return (
    <ResizeBox
      className={`hidden ${isShowed ? 'lg:block' : 'md:block'}`}
      type="sidebar"
    >
      <div
        className={twMerge(
          `flex flex-col bg-black gap-y-2 h-full  p-2`,
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
        <ScrollArea
          className="h-full w-full rounded-lg bg-neutral-900"
          onScroll={handleScroll}
        >
          <Library playlists={playlists} isScroll={isScroll} />
        </ScrollArea>
      </div>
    </ResizeBox>
  )
}

export default memo(Sidebar)
