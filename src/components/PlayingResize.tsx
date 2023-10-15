'use client'

import { type ElementRef, type FC, useEffect, useRef, useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'

import usePlayingView from '@/stores/usePlayingView'
import cn from '@/utils/cn'

interface PlayingResizeProps {
  children: React.ReactNode
  minWidth?: number
  maxWidth?: number
  className?: string
}

const PlayingResize: FC<PlayingResizeProps> = ({
  children,
  minWidth = 300,
  maxWidth = 500,
  className,
}) => {
  const isMobile = useMediaQuery('(max-width: 768px)')

  const isResizingRef = useRef(false)
  const playingViewRef = useRef<ElementRef<'aside'>>(null)
  const [isResetting, setIsResetting] = useState(false)
  const {
    isShowed,
    setShowed,
    setResetMaxWidth,
    setCollapsed,
    setResetMinWidth,
  } = usePlayingView()

  const handleMouseMove = (event: MouseEvent): void => {
    if (!isResizingRef.current) return
    let newWidth = event.clientX
    if (playingViewRef.current) {
      newWidth =
        playingViewRef.current.offsetWidth -
        (event.clientX - playingViewRef.current.getBoundingClientRect().left)
    }

    if (newWidth < minWidth) newWidth = minWidth
    if (newWidth > maxWidth) newWidth = maxWidth

    if (playingViewRef.current) {
      playingViewRef.current.style.width = `${newWidth}px`
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
    if (playingViewRef.current) {
      setIsResetting(true)
      setShowed(true)

      playingViewRef.current.style.width = isMobile ? '100%' : `${minWidth}px`
      setTimeout(() => setIsResetting(false), 300)
    }
  }

  const resetMaxWidth = (): void => {
    if (playingViewRef.current) {
      setShowed(true)
      setIsResetting(true)

      playingViewRef.current.style.width = `${maxWidth}px`

      setTimeout(() => setIsResetting(false), 300)
    }
  }

  const collapse = (): void => {
    if (playingViewRef.current) {
      setIsResetting(true)
      setShowed(false)

      playingViewRef.current.style.width = '0px'
      setTimeout(() => setIsResetting(false), 300)
    }
  }

  useEffect(() => {
    if (isShowed) {
      resetMaxWidth()
    } else {
      collapse()
    }
  }, [isShowed])

  useEffect(() => {
    if (isMobile) {
      setShowed(false)
    }
  }, [isMobile])

  useEffect(() => {
    setResetMaxWidth(resetMaxWidth)
    setResetMinWidth(resetMinWidth)
    setCollapsed(collapse)
  }, [])

  return (
    <>
      <aside
        ref={playingViewRef}
        className={cn(
          `group/playing h-full bg-secondary overflow-y-auto relative flex flex-col `,
          className,
          isResetting && 'transition-all ease-in-out duration-300'
        )}
      >
        <div
          onMouseDown={handleMouseDown}
          // onClick={resetWidth}
          className="absolute left-0 top-0 h-full w-2 cursor-ew-resize bg-black transition "
        />

        {children}
      </aside>
      {!isShowed ? <div className="h-full w-2 bg-black "></div> : null}
    </>
  )
}

export default PlayingResize
