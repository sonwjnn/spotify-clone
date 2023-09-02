'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx'
import { HiHome } from 'react-icons/hi'
import { BiSearch } from 'react-icons/bi'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import Button from './Button'
import useAuthModal from '@/hooks/useAuthModal'
import { FaUserAlt } from 'react-icons/fa'
import { useUser } from '@/hooks/useUser'
import { toast } from 'react-hot-toast'

interface HeaderProps {
	children: React.ReactNode
	classname?: string
}

const Header: React.FC<HeaderProps> = ({ children, classname }) => {
	const router = useRouter()
	const authModal = useAuthModal()
	const { user } = useUser()

	const supabaseClient = useSupabaseClient()

	const handleLogout = async () => {
		const { error } = await supabaseClient.auth.signOut()
		//Todo: reset any playing songs
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
				classname,
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
					<button className='flex rounded-full bg-white p-2 items-center justify-center hover:opacity-75 transition'>
						<HiHome className='text-black ' size={20} />
					</button>
					<button className='flex rounded-full bg-white p-2 items-center justify-center hover:opacity-75 transition'>
						<BiSearch className='text-black ' size={20} />
					</button>
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

export default Header
