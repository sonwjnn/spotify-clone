import { cva, type VariantProps } from 'class-variance-authority'
import { LuLoader } from 'react-icons/lu'

import { cn } from '@/lib/utils'

const spinnerVariants = cva('animate-spin text-neutral-400', {
  variants: {
    size: {
      default: 'h-4 w-4',
      sm: 'h-2 w-2',
      lg: 'h-6 w-6',
      icon: 'h-10 w-10',
    },
  },
  defaultVariants: {
    size: 'default',
  },
})

interface SpinnerProps extends VariantProps<typeof spinnerVariants> {}

export const Spinner = ({ size }: SpinnerProps) => {
  return <LuLoader className={cn(spinnerVariants({ size }))} />
}
