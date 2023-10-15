'use client'

import { type ElementRef, useEffect, useRef, useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'

import useComponentSize from '@/hooks/useComponentSize'
import useSidebar from '@/stores/useSideBar'
import cn from '@/utils/cn'

interface SizebarResizeProps {
  children: React.ReactNode
  minWidth?: number
  maxWidth?: number
  type?: 'sidebar' | 'playing'
  className?: string
}

const SizebarResize: React.FC<SizebarResizeProps> = ({
  children,
  minWidth = 300,
  maxWidth = 500,
  className,
}) => {
  const isTablet = useMediaQuery('(max-width: 768px)')
  const isMobile = useMediaQuery('(max-width: 585px)')

  const isResizingRef = useRef(false)
  const sidebarRef = useRef<ElementRef<'aside'>>(null)
  const [isResetting, setIsResetting] = useState(false)

  const size = useComponentSize(sidebarRef)

  const {
    setWidth,
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
    if (newWidth > maxWidth) newWidth = maxWidth

    if (sidebarRef.current) {
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
      sidebarRef.current.style.width = '92px'
      setTimeout(() => setIsResetting(false), 300)
    }
  }

  useEffect(() => {
    if (isTablet) {
      collapse()
    }
  }, [isTablet])

  useEffect(() => {
    if (isCollapsed) {
      collapse()
    } else {
      resetMinWidth()
    }
  }, [isCollapsed])

  useEffect(() => {
    if (size.width === maxWidth) setIsMaxWidth(true)
    else {
      setIsMaxWidth(false)
    }

    setWidth(size.width)
  }, [size.width, setWidth])

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
          `group/sidebar h-full bg-secondary overflow-y-auto relative flex w-[${minWidth}px] flex-col`,
          className,
          isMobile && 'hidden',
          isResetting && 'transition-all ease-in-out duration-300'
        )}
      >
        {children}

        <div
          onMouseDown={handleMouseDown}
          // onClick={resetWidth}
          className="absolute right-0 top-0 h-full w-2 cursor-ew-resize bg-black transition "
        />
      </aside>
      {isMobile ? <div className="h-full w-2 bg-black "></div> : null}
    </>
  )
}

export default SizebarResize