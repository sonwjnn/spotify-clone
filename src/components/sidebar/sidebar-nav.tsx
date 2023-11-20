'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import type { IconType } from 'react-icons'
import { twMerge } from 'tailwind-merge'

import { useSidebar } from '@/hooks/use-sidebar'
import type { IconProps } from '@/public/icons'
import {
  HomeActiveIcon,
  HomeIcon,
  SearchActiveIcon,
  SearchIcon,
} from '@/public/icons'

import { Box } from '../ui/box'
import { Tooltip } from '../ui/tooltip'

interface NavItemProps {
  icons: IconType[]
  label: string
  active?: boolean
  href: string
}

const NavItem: React.FC<NavItemProps> = ({ icons, label, active, href }) => {
  const { isCollapsed } = useSidebar()
  const Icon: ((props: Partial<IconProps>) => JSX.Element) | undefined = active
    ? icons[0]
    : icons[1]
  return (
    <Link
      href={href}
      className={twMerge(
        `flex h-auto w-full cursor-pointer flex-row items-center gap-x-4 py-1 pl-1 text-base font-bold text-neutral-400 transition hover:text-white`,
        active && 'text-white'
      )}
    >
      <div className=" h-6 w-6">{Icon ? <Icon /> : null}</div>

      {!isCollapsed && <p className="w-full truncate">{label}</p>}
    </Link>
  )
}

export const SidebarNav: React.FC = () => {
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
  return (
    <Box>
      <div className="flex flex-col gap-y-4 px-5 py-4">
        {routes.map(item => (
          <div className="h-full w-full" key={item.label}>
            {isCollapsed ? (
              <Tooltip text={item.label} side="right">
                <NavItem {...item} />
              </Tooltip>
            ) : (
              <NavItem {...item} />
            )}
          </div>
        ))}
      </div>
    </Box>
  )
}
