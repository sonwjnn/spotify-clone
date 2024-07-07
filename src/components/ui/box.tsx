import { twMerge } from 'tailwind-merge'

type BoxProps = {
  children: React.ReactNode
  className?: string
  onScroll?: (e: React.UIEvent<HTMLDivElement, UIEvent>) => void
}

export const Box = ({ children, className, onScroll }: BoxProps) => {
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
