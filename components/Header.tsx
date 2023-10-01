'use client'

import { twMerge } from 'tailwind-merge'

interface HeaderProps {
	children: React.ReactNode
	className?: string
	bgColor?: string
}

const Header: React.FC<HeaderProps> = (
	{ children, className, bgColor = '#065f46' },
) => {
	return (
		<div
			className={twMerge(
				` h-fit  p-6 pt-16`,
				className,
			)}
			style={{
				backgroundImage:
					`linear-gradient(to bottom, ${bgColor}, rgba(255,0,0,0))`,
			}}
		>
			{children}
		</div>
	)
}

export default Header
