'use client'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import { BiSearch } from 'react-icons/bi'
import { HiHome } from 'react-icons/hi'
import Box from './Box'
import { IconType } from 'react-icons'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'
import Library from './Library'
import { Song } from '@/types'
import usePlayer from '@/hooks/usePlayer'

interface SidebarProps {
	children: React.ReactNode
	songs: Song[]
}

interface SidebarItemProps {
	icon: IconType
	label: string
	active?: boolean
	href: string
}

const SidebarItem: React.FC<SidebarItemProps> = ({
	icon: Icon,
	label,
	active,
	href,
}) => {
	return (
		<Link
			href={href}
			className={twMerge(
				`flex flex-row h-auto items-center w-full gap-x-4 text-md font-medium cursor-pointer hover:text-white transition text-neutral-400 py-1`,
				active && 'text-white',
			)}
		>
			<Icon size={26} />
			<p className='truncate w-full'>{label}</p>
		</Link>
	)
}

const Sidebar: React.FC<SidebarProps> = ({ children, songs }) => {
	const pathname = usePathname()

	const player = usePlayer()

	const routes = useMemo(
		() => [
			{
				icon: HiHome,
				label: 'Home',
				active: pathname !== '/search',
				href: '/',
			},
			{
				icon: BiSearch,
				label: 'Search',
				active: pathname === '/search',
				href: '/search',
			},
		],
		[pathname],
	)
	return (
		<div
			className={twMerge(
				`flex h-full`,
				player.activeId && 'h-[calc(100%-80px)]',
			)}
		>
			<div className='hidden md:flex flex-col bg-black gap-y-2 h-full w-[300px] p-2'>
				<Box>
					<div className='flex flex-col gap-y-4 px-5 py-4'>
						{routes.map((item) => (
							<SidebarItem key={item.label} {...item} />
						))}
					</div>
				</Box>
				<Box className='overflow-y-auto h-full'>
					<Library songs={songs} />
				</Box>
			</div>
			<main className='h-full flex-1 overflow-y-auto py-2'>
				{children}
			</main>
		</div>
	)
}

export default Sidebar
