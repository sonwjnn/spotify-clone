'use client'

import { twMerge } from 'tailwind-merge'

interface HeaderProps {
	children: React.ReactNode
	className?: string
}

const Header: React.FC<HeaderProps> = (
	{ children, className },
) => {
	return (
		<div
			className={twMerge(
				` h-fit bg-gradient-to-b from-emerald-800 p-6 pt-16`,
				className,
			)}
		>
			{children}
		</div>
	)
}

export default Header
