'use client'

import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { ScrollArea } from '../ui/scroll-area'
import { Library } from './library/library'
import { SidebarNav } from './sidebar-nav'
import { SidebarResizer } from './sidebar-resizer'

interface SidebarProps {
  className?: string
}

export const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const [isScroll, setScroll] = useState<boolean>(false)

  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>): void => {
    const yAxis = e.currentTarget.scrollTop
    if (yAxis) {
      setScroll(true)
    } else {
      setScroll(false)
    }
  }

  return (
    <SidebarResizer minWidth={300} maxWidth={500}>
      <div
        className={twMerge(
          `flex flex-col bg-black gap-y-2 h-full  p-2`,
          className
        )}
      >
        <SidebarNav />

        <ScrollArea
          className="h-full w-full rounded-lg bg-neutral-900"
          onScroll={handleScroll}
        >
          <Library isScroll={isScroll} />
        </ScrollArea>
      </div>
    </SidebarResizer>
  )
}
