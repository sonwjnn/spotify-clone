import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, disabled, type, startIcon, endIcon, ...props }, ref) => {
    return (
      <div className="relative w-full">
        {startIcon && (
          <div className="pointer-events-none absolute inset-y-0 left-1 flex items-center pl-3 text-white">
            {startIcon}
          </div>
        )}
        <input
          className={twMerge(
            ` flex w-full rounded-md border border-transparent bg-zinc-200 px-3 py-3 text-sm text-zinc-500 file:border-0  file:bg-transparent file:font-medium file:text-zinc-500 placeholder:text-zinc-500 focus:outline-none disabled:cursor-not-allowed dark:bg-neutral-800 dark:text-neutral-400 dark:file:text-neutral-400 dark:placeholder:text-neutral-400`,
            className
          )}
          type={type}
          disabled={disabled}
          ref={ref}
          {...props}
        />
        {endIcon && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            {endIcon}
          </div>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
