'use client'

import { usePathname } from 'next/navigation'
import { type ElementRef, type FC, useEffect, useRef, useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'

import usePlayingSidebar from '@/stores/usePlayingSidebar'
import cn from '@/utils/cn'

interface ResizePlayingProps {
  children: React.ReactNode
  minWidth?: number
  maxWidth?: number
  type?: 'sidebar' | 'playing'
  className?: string
}

export const ResizePlaying: FC<ResizePlayingProps> = ({
  children,
  minWidth = 300,
  maxWidth = 500,
  type,
  className,
}) => {
  const pathname = usePathname()
  const isMobile = useMediaQuery('(max-width: 768px)')

  const isResizingRef = useRef(false)
  const sidebarRef = useRef<ElementRef<'aside'>>(null)
  const navbarRef = useRef<ElementRef<'div'>>(null)
  const [isResetting, setIsResetting] = useState(false)
  const { setShowed, setHandleCollapsed } = usePlayingSidebar()

  const handleMouseMove = (event: MouseEvent): void => {
    if (!isResizingRef.current) return
    let newWidth = event.clientX
    if (type === 'playing' && sidebarRef.current) {
      newWidth =
        sidebarRef.current.offsetWidth -
        (event.clientX - sidebarRef.current.getBoundingClientRect().left)
    }

    if (newWidth < minWidth) newWidth = minWidth
    if (newWidth > maxWidth) newWidth = maxWidth

    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`
      navbarRef.current.style.setProperty('right', `${newWidth}px`)
      navbarRef.current.style.setProperty(
        'min-width',
        `calc(100% - ${newWidth}px)`
      )
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

  const resetWidth = (): void => {
    if (sidebarRef.current && navbarRef.current) {
      setIsResetting(true)
      setShowed(true)

      sidebarRef.current.style.width = isMobile ? '100%' : `${minWidth}px`
      navbarRef.current.style.setProperty(
        'width',
        isMobile ? '0' : `calc(100% - ${minWidth}px)`
      )
      navbarRef.current.style.setProperty(
        'right',
        isMobile ? '100%' : `${minWidth}px`
      )
      setTimeout(() => setIsResetting(false), 300)
    }
  }

  const collapse = (): void => {
    if (sidebarRef.current && navbarRef.current) {
      setIsResetting(true)
      setShowed(false)

      sidebarRef.current.style.width = '0px'
      navbarRef.current.style.setProperty('width', '100%')
      navbarRef.current.style.setProperty('right', '0')
      setTimeout(() => setIsResetting(false), 300)
    }
  }

  useEffect(() => {
    if (isMobile) {
      collapse()
    } else {
      resetWidth()
    }
  }, [isMobile])

  useEffect(() => {
    console.log(isResetting)
  }, [isResetting])

  useEffect(() => {
    if (isMobile) {
      collapse()
    }
  }, [pathname, isMobile])

  useEffect(() => {
    setHandleCollapsed(resetWidth, collapse)
  }, [])

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          `group/playing h-full bg-secondary overflow-y-auto relative flex flex-col z-[99999]`,
          className,
          'transition-all ease-in-out duration-300',
          isMobile && 'w-0'
        )}
      >
        <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className="absolute left-0 top-0 h-full w-2 cursor-ew-resize bg-black transition "
        />

        {children}
      </aside>
      <div
        ref={navbarRef}
        className={cn(
          'absolute top-0 z-[99999] left-60 w-[calc(100%-300px)]',
          isResetting && 'transition-all ease-in-out duration-300',
          isMobile && 'left-0 w-full'
        )}
      ></div>
    </>
  )
}
