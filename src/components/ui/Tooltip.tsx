'use client'

import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import * as React from 'react'

import cn from '@/utils/cn'

const TooltipProvider = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Provider>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Provider>
>(({ delayDuration = 300, ...props }) => (
  <TooltipPrimitive.Provider delayDuration={delayDuration} {...props} />
))
TooltipProvider.displayName = TooltipPrimitive.Provider.displayName

const TooltipRoot = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      'z-[51] overflow-hidden rounded-md bg-primary px-3 py-1.5 text-sm mb-2 text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 shadow-base',
      className
    )}
    {...props}
  />
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

interface TooltipProps {
  children: React.ReactNode
  text: string
  side?: 'top' | 'right' | 'bottom' | 'left'
}

const Tooltip: React.FC<TooltipProps> = ({ text, children, side }) => {
  return (
    <TooltipProvider>
      <TooltipRoot>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent side={side}>
          <p>{text}</p>
        </TooltipContent>
      </TooltipRoot>
    </TooltipProvider>
  )
}

export { TooltipContent, TooltipProvider, TooltipRoot, TooltipTrigger }
export default Tooltip
