'use client'

import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { ScrollArea } from '@/components/ui/scroll-area'
import { Library } from '@/components/sidebar/library'
import { SidebarNav } from '@/components/sidebar/sidebar-nav'
import { SidebarResizer } from '@/components/sidebar/sidebar-resizer'

type SidebarProps = {
  className?: string
}

export const Sidebar = ({ className }: SidebarProps) => {
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
          `flex h-full flex-col gap-y-2 bg-white p-2  dark:bg-black`,
          className
        )}
      >
        <SidebarNav />

        <ScrollArea
          className="h-full w-full rounded-lg bg-[#F1F2F4] dark:bg-neutral-900"
          onScroll={handleScroll}
        >
          <Library isScroll={isScroll} />
        </ScrollArea>
      </div>
    </SidebarResizer>
  )
}
