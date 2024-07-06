import { twMerge } from 'tailwind-merge'

interface BoxProps {
  children: React.ReactNode
  className?: string
  onScroll?: (e: React.UIEvent<HTMLDivElement, UIEvent>) => void
}

export const Box: React.FC<BoxProps> = ({ children, className, onScroll }) => {
  return (
    <div
      onScroll={onScroll}
      className={twMerge(
        `h-fit w-full rounded-lg bg-[#F1F2F4] dark:bg-neutral-900`,
        className
      )}
    >
      {children}
    </div>
  )
}
