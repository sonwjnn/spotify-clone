'use client'

import { usePathname } from 'next/navigation'
import { memo, useMemo } from 'react'
import {
	HomeActiveIcon,
	HomeIcon,
	SearchActiveIcon,
	SearchIcon,
} from '@/assets/icons'
import Box from './Box'
import { IconType } from 'react-icons'
import Link from 'next/link'
import Library from './Library'
import { Song } from '@/types'
import { twMerge } from 'tailwind-merge'

interface SidebarProps {
	songs: Song[]
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
				`flex flex-row h-auto items-center w-full gap-x-4 text-md font-medium cursor-pointer hover:text-white transition text-neutral-400 py-1`,
				active && 'text-white',
			)}
		>
			<Icon size={26} />
			<p className='truncate w-full'>{label}</p>
		</Link>
	)
}

const Sidebar: React.FC<SidebarProps> = ({ songs }) => {
	const pathname = usePathname()

	const routes = useMemo(
		() => [
			{
				icons: [HomeActiveIcon, HomeIcon] as IconType[],
				label: 'Home',
				active: pathname !== '/search',
				href: '/',
			},
			{
				icons: [SearchActiveIcon, SearchIcon] as IconType[],
				label: 'Search',
				active: pathname === '/search',
				href: '/search',
			},
		],
		[pathname],
	)

	return (
		<div className='hidden md:flex flex-col bg-black gap-y-2 h-full min-w-[300px] max-w-[500px] py-2 pl-2'>
			<Box>
				<div className='flex flex-col gap-y-4 px-5 py-4'>
					{routes.map((item) => (
						<SidebarItem key={item.label} {...item} />
					))}
				</div>
			</Box>
			<Box className='overflow-y-auto h-full [&::-webkit-scrollbar]:[width:0px]'>
				<Library songs={songs} />
			</Box>
		</div>
	)
}

export default memo(Sidebar)
