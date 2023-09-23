import { twMerge } from 'tailwind-merge'

interface BoxProps {
	children: React.ReactNode
	className?: string
	onScroll?: (e: React.UIEvent<HTMLDivElement, UIEvent>) => void
}

const Box: React.FC<BoxProps> = ({ children, className, onScroll }) => {
	return (
		<div
			onScroll={onScroll}
			className={twMerge(
				`bg-neutral-900 rounded-lg h-fit w-full`,
				className,
			)}
		>
			{children}
		</div>
	)
}

export default Box
