'use client'

import { type ElementRef, memo, useEffect, useRef, useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'

import { useSidebar } from '@/store/use-sidebar'
import { cn } from '@/lib/utils'
import { usePlayingView } from '@/store/use-playing-view'

type SidebarResizerProps = {
  children: React.ReactNode
  minWidth?: number
  maxWidth?: number
  className?: string
}

// eslint-disable-next-line react/display-name
export const SidebarResizer = memo(
  ({
    children,
    minWidth = 300,
    maxWidth = 500,
    className,
  }: SidebarResizerProps) => {
    const isTablet = useMediaQuery('(max-width: 768px)')
    const isMobile = useMediaQuery('(max-width: 585px)')
    const isMediumScreen = useMediaQuery('(max-width: 987px)')

    const isResizingRef = useRef(false)
    const sidebarRef = useRef<ElementRef<'aside'>>(null)
    const [isResetting, setIsResetting] = useState(false)

    const { isShowed } = usePlayingView()

    const {
      isCollapsed,
      setIsCollapsed,
      setIsMaxWidth,
      setCollapsed,
      setResetMaxWidth,
      setResetMinWidth,
    } = useSidebar()

    const handleMouseMove = (event: MouseEvent): void => {
      if (!isResizingRef.current) return
      let newWidth = event.clientX

      if (newWidth < minWidth) {
        if (newWidth < minWidth / 2) {
          newWidth = 92
          setIsCollapsed(true)
        } else {
          newWidth = minWidth
          setIsCollapsed(false)
        }
      }
      if (newWidth >= maxWidth) {
        setIsMaxWidth(true)

        newWidth = maxWidth
      }
      if (minWidth < newWidth && newWidth < maxWidth) {
        setIsMaxWidth(false)
      }

      if (sidebarRef.current) {
        sidebarRef.current.style.transition = ''
        sidebarRef.current.style.width = `${newWidth}px`
      }
    }

    const handleMouseUp = (): void => {
      isResizingRef.current = false
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    const handleMouseDown = (
      event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ): void => {
      event.preventDefault()
      event.stopPropagation()

      isResizingRef.current = true
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    const resetMinWidth = (): void => {
      if (sidebarRef.current) {
        setIsCollapsed(false)
        setIsResetting(true)

        sidebarRef.current.style.width = `${minWidth}px`

        setTimeout(() => setIsResetting(false), 300)
        setIsMaxWidth(false)
      }
    }

    const resetToMaxWidth = (): void => {
      if (sidebarRef.current) {
        setIsCollapsed(false)
        setIsResetting(true)
        sidebarRef.current.style.width = `${maxWidth}px`
        setTimeout(() => setIsResetting(false), 300)
        setIsMaxWidth(true)
      }
    }

    const collapse = (): void => {
      if (sidebarRef.current) {
        setIsCollapsed(true)
        setIsResetting(true)
        sidebarRef.current.style.width = '86px'
        setTimeout(() => setIsResetting(false), 300)
      }
    }

    useEffect(() => {
      if (isTablet && !isCollapsed) {
        collapse()
      }
    }, [isTablet])

    useEffect(() => {
      if (isMediumScreen && !isCollapsed && isShowed) {
        collapse()
      } else if (!isMediumScreen && isCollapsed) {
        resetMinWidth()
      }
    }, [isMediumScreen])

    useEffect(() => {
      if (isCollapsed) {
        collapse()
      } else {
        resetMinWidth()
      }
    }, [isCollapsed])

    useEffect(() => {
      setResetMaxWidth(resetToMaxWidth)
      setResetMinWidth(resetMinWidth)
      setCollapsed(collapse)
    }, [])

    return (
      <>
        <aside
          ref={sidebarRef}
          className={cn(
            `group/sidebar relative flex h-full overflow-y-auto bg-secondary w-[${minWidth}px] flex-col`,
            className,
            isMobile && 'hidden',
            isResetting && 'transition-all duration-300 ease-in-out'
          )}
        >
          {children}

          <div
            onMouseDown={handleMouseDown}
            // onClick={resetWidth}
            className="absolute right-0 top-0  h-full w-2 cursor-ew-resize border-l-transparent bg-white transition-all ease-in-out  hover:border-l hover:border-l-white dark:bg-black"
          />
        </aside>
        {isMobile ? (
          <div className="h-full w-2 bg-white dark:bg-black "></div>
        ) : null}
      </>
    )
  }
)
