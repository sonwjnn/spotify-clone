import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	startIcon?: React.ReactNode
	endIcon?: React.ReactNode
}

const Input = forwardRef<HTMLInputElement, InputProps>(
	({ className, disabled, type, startIcon, endIcon, ...props }, ref) => {
		return (
			<div className='relative'>
				{startIcon && (
					<div className='absolute inset-y-0 left-1 pl-3 flex items-center pointer-events-none'>
						{startIcon}
					</div>
				)}
				<input
					className={twMerge(
						` flex rounded-md w-full border border-transparent px-3 py-3 text-sm file:border-0 file:bg-transparent file:font-medium placeholder:text-neutral-400 disabled:cursor-not-allowed focus:outline-none `,
						className,
					)}
					type={type}
					disabled={disabled}
					ref={ref}
					{...props}
				/>
				{endIcon && (
					<div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
						{endIcon}
					</div>
				)}
			</div>
		)
	},
)

Input.displayName = 'Input'
export default Input
