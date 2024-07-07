'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import type { IconType } from 'react-icons'
import { twMerge } from 'tailwind-merge'

import { useSidebar } from '@/store/use-sidebar'
import type { IconProps } from '@/public/icons'
import { HomeIcon, SearchIcon } from '@/public/icons'

import { Box } from '@/components/ui/box'
import { Tooltip } from '@/components/ui/tooltip'

type NavItemProps = {
  icon: IconType
  label: string
  active?: boolean
  href: string
}

export const NavItem = ({ icon, label, active, href }: NavItemProps) => {
  const { isCollapsed } = useSidebar()
  const Icon: ((props: Partial<IconProps>) => JSX.Element) | undefined = icon

  return (
    <Link
      href={href}
      className={twMerge(
        `flex h-auto w-full cursor-pointer flex-row items-center gap-x-4 py-1 pl-1 text-base font-bold text-zinc-700 transition dark:text-neutral-400 dark:hover:text-white`,
        active && 'text-green-600 dark:text-white'
      )}
    >
      <div className="h-6 w-6">
        {Icon ? (
          <Icon
            className={`${active ? 'animate-spin-once' : null}`}
            active={active ? true : false}
          />
        ) : null}
      </div>

      {!isCollapsed && <p className="w-full truncate">{label}</p>}
    </Link>
  )
}

export const SidebarNav = () => {
  const pathname = usePathname()
  const { isCollapsed } = useSidebar()
  const routes = useMemo(
    () => [
      {
        icon: HomeIcon as IconType,
        label: 'Home',
        active: pathname === '/',
        href: '/',
      },
      {
        icon: SearchIcon as IconType,
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
