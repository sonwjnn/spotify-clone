'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMemo, useState } from 'react'
import type { IconType } from 'react-icons'
import { twMerge } from 'tailwind-merge'

import { useSidebar } from '@/hooks/use-sidebar'
import {
  HomeActiveIcon,
  HomeIcon,
  type IconProps,
  SearchActiveIcon,
  SearchIcon,
} from '@/public/icons'

import { Library } from './library'
import { Box } from './ui/box'
import { ScrollArea } from './ui/scroll-area'
import { Tooltip } from './ui/tooltip'

interface SidebarProps {
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
  const { isCollapsed } = useSidebar()
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

export const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const pathname = usePathname()
  const { isCollapsed } = useSidebar()
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
    <div
      className={twMerge(
        `flex flex-col bg-black gap-y-2 h-full  p-2`,
        className
      )}
    >
      <Box>
        <div className="flex flex-col gap-y-4 px-5 py-4">
          {routes.map(item => (
            <div className="h-full w-full" key={item.label}>
              {isCollapsed ? (
                <Tooltip text={item.label} side="right">
                  <SidebarItem {...item} />
                </Tooltip>
              ) : (
                <SidebarItem {...item} />
              )}
            </div>
          ))}
        </div>
      </Box>
      <ScrollArea
        className="h-full w-full rounded-lg bg-neutral-900"
        onScroll={handleScroll}
      >
        <Library isScroll={isScroll} />
      </ScrollArea>
    </div>
  )
}
