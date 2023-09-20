'use client'

import { usePathname, useRouter } from 'next/navigation'
import { twMerge } from 'tailwind-merge'
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx'
import {
	HomeActiveIcon,
	HomeIcon,
	SearchActiveIcon,
	SearchIcon,
} from '@/assets/icons'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import Button from './Button'
import useAuthModal from '@/hooks/useAuthModal'
import { FaUserAlt } from 'react-icons/fa'
import { useUser } from '@/hooks/useUser'
import { toast } from 'react-hot-toast'
import usePlayer from '@/stores/usePlayer'
import { memo, useMemo } from 'react'
import Link from 'next/link'

interface HeaderProps {
	children: React.ReactNode
	className?: string
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
	const router = useRouter()
	const authModal = useAuthModal()
	const { user } = useUser()
	const player = usePlayer()

	const supabaseClient = useSupabaseClient()

	const pathname = usePathname()

	const routes = useMemo(
		() => [
			{
				icon: [HomeActiveIcon, HomeIcon],
				label: 'Home',
				active: pathname !== '/search',
				href: '/',
			},
			{
				icon: [SearchActiveIcon, SearchIcon],
				label: 'Search',
				active: pathname === '/search',
				href: '/search',
			},
		],
		[pathname],
	)

	const handleLogout = async () => {
		const { error } = await supabaseClient.auth.signOut()
		player.reset()
		router.refresh()

		if (error) {
			toast.error(error.message)
		} else {
			toast.success('Logged out!')
		}
	}

	return (
		<div
			className={twMerge(
				`h-fit bg-gradient-to-b from-emerald-800 p-6`,
				className,
			)}
		>
			<div className='w-full mb-4 flex items-center justify-between'>
				<div className='hidden md:flex gap-x-2 items-center'>
					<button
						className='rounded-full bg-black items-center justify-center hover:opacity-75 transition'
						onClick={() => router.back()}
					>
						<RxCaretLeft className='text-white' size={35} />
					</button>
					<button
						className='rounded-full bg-black items-center justify-center hover:opacity-75 transition'
						onClick={() => router.forward()}
					>
						<RxCaretRight className='text-white' size={35} />
					</button>
				</div>
				<div className='flex md:hidden gap-x-2 items-center'>
					{routes.map((item, index) => {
						const Icon = item.active ? item.icon[0] : item.icon[1]
						return (
							<Link
								key={index}
								href={item.href}
								className={twMerge(
									`flex rounded-full w-10 h-10 bg-white p-2 items-center justify-center hover:opacity-75 transition`,
								)}
							>
								<Icon size={22} color='#000000' />
							</Link>
						)
					})}
				</div>
				<div className='flex justify-between items-center gap-x-4'>
					{user
						? (
							<div className='flex gap-x-4 items-center'>
								<Button
									onClick={handleLogout}
									className='bg-white px-6 py-2'
								>
									Logout
								</Button>
								<Button
									onClick={() => router.push('/account')}
									className='bg-white'
								>
									<FaUserAlt />
								</Button>
							</div>
						)
						: (
							<>
								<div>
									<Button
										className='bg-transparent text-neutral-300 font-medium'
										onClick={authModal.onOpen}
									>
										Sign up
									</Button>
								</div>
								<div>
									<Button
										className='bg-transparent text-neutral-300 font-medium'
										onClick={authModal.onOpen}
									>
										Log in
									</Button>
								</div>
							</>
						)}
				</div>
			</div>
			{children}
		</div>
	)
}

export default memo(Header)
