'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'

const Scrollbar = ({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const scrollTrackRef = useRef<HTMLDivElement>(null)
  const scrollThumbRef = useRef<HTMLDivElement>(null)

  const observer = useRef<ResizeObserver | null>(null)
  const [thumbHeight, setThumbHeight] = useState(20)
  const [scrollStartPosition, setScrollStartPosition] = useState<number | null>(
    null
  )
  const [initialScrollTop, setInitialScrollTop] = useState<number>(0)
  const [isDragging, setIsDragging] = useState(false)

  // function handleResize(ref: HTMLDivElement, trackSize: number) {
  //   const { clientHeight, scrollHeight } = ref;

  //   setThumbHeight(Math.max((clientHeight / scrollHeight) * trackSize, 20));
  // }

  const handleResize = useCallback((ref: HTMLDivElement, trackSize: number) => {
    const { clientHeight, scrollHeight } = ref

    setThumbHeight(Math.max((clientHeight / scrollHeight) * trackSize, 20))
  }, [])

  const handleTrackClick = useCallback(
    (e: any) => {
      e.preventDefault()
      e.stopPropagation()
      const { current: trackCurrent } = scrollTrackRef
      const { current: contentCurrent } = contentRef
      if (trackCurrent && contentCurrent) {
        const { clientY } = e
        const target = e.target as HTMLDivElement
        const rect = target.getBoundingClientRect()
        const trackTop = rect.top
        const thumbOffset = -(thumbHeight / 2)
        const clickRatio =
          (clientY - trackTop + thumbOffset) / trackCurrent.clientHeight
        const scrollAmount = Math.floor(
          clickRatio * contentCurrent.scrollHeight
        )
        contentCurrent.scrollTo({
          top: scrollAmount,
          behavior: 'smooth',
        })
      }
    },
    [thumbHeight]
  )

  const handleThumbPosition = useCallback(() => {
    if (
      !contentRef.current ||
      !scrollTrackRef.current ||
      !scrollThumbRef.current
    ) {
      return
    }
    const { scrollTop: contentTop, scrollHeight: contentHeight } =
      contentRef.current
    const { clientHeight: trackHeight } = scrollTrackRef.current
    let newTop = (+contentTop / +contentHeight) * trackHeight
    newTop = Math.min(newTop, trackHeight - thumbHeight)
    const thumb = scrollThumbRef.current
    thumb.style.top = `${newTop}px`
  }, [])

  const handleThumbMousedown = useCallback((e: any) => {
    e.preventDefault()
    e.stopPropagation()
    setScrollStartPosition(e.clientY)
    if (contentRef.current) {
      setInitialScrollTop(contentRef.current.scrollTop)
    }
    setIsDragging(true)
  }, [])

  const handleThumbMouseup = useCallback(
    (e: any) => {
      e.preventDefault()
      e.stopPropagation()
      if (isDragging) {
        setIsDragging(false)
      }
    },
    [isDragging]
  )

  const handleThumbMousemove = useCallback(
    (e: any) => {
      e.preventDefault()
      e.stopPropagation()
      if (isDragging) {
        if (contentRef.current) {
          const {
            scrollHeight: contentScrollHeight,
            offsetHeight: contentOffsetHeight,
          } = contentRef.current

          const deltaY =
            (e.clientY - scrollStartPosition!) *
            (contentOffsetHeight / thumbHeight)
          const newScrollTop = Math.min(
            initialScrollTop + deltaY,
            contentScrollHeight - contentOffsetHeight
          )

          contentRef.current.scrollTop = newScrollTop
        }
      }
    },
    [isDragging, scrollStartPosition, thumbHeight, initialScrollTop]
  )

  // If the content and the scrollbar track exist, use a ResizeObserver to adjust height of thumb and listen for scroll event to move the thumb
  useEffect(() => {
    if (contentRef.current && scrollTrackRef.current) {
      const ref = contentRef.current
      const { clientHeight: trackSize } = scrollTrackRef.current
      observer.current = new ResizeObserver(() => {
        handleResize(ref, trackSize)
      })
      observer.current.observe(ref)
      ref.addEventListener('scroll', handleThumbPosition)
      return () => {
        observer.current?.unobserve(ref)
        ref.removeEventListener('scroll', handleThumbPosition)
      }
    }
  }, [handleThumbPosition, handleResize])

  // Listen for mouse events to handle scrolling by dragging the thumb
  // useEffect(() => {
  //   document.addEventListener("mousemove", handleThumbMousemove);
  //   document.addEventListener("mouseup", handleThumbMouseup);
  //   document.addEventListener("mouseleave", handleThumbMouseup);
  //   return () => {
  //     document.removeEventListener("mousemove", handleThumbMousemove);
  //     document.removeEventListener("mouseup", handleThumbMouseup);
  //     document.removeEventListener("mouseleave", handleThumbMouseup);
  //   };
  // }, [handleThumbMousemove, handleThumbMouseup]);

  useEffect(() => {
    const container = containerRef.current

    // Lắng nghe sự kiện trên phần tử chứa Scrollbar
    container?.addEventListener('mousemove', handleThumbMousemove)
    container?.addEventListener('mouseup', handleThumbMouseup)
    container?.addEventListener('mouseleave', handleThumbMouseup)
    // Xóa lắng nghe khi unmount
    return () => {
      container?.removeEventListener('mousemove', handleThumbMousemove)
      container?.removeEventListener('mouseup', handleThumbMouseup)
      container?.removeEventListener('mouseleave', handleThumbMouseup)
    }
  }, [handleThumbMousemove, handleThumbMouseup])

  return (
    <div
      className={twMerge(
        `bg-neutral-900 rounded-lg flex flex-row h-full w-full overflow-hidden relative group/global`,
        className
      )}
      ref={containerRef}
    >
      <div
        className="overflow-auto  h-full w-full scrollbar"
        ref={contentRef}
        {...props}
      >
        {children}
      </div>
      <div className="grid gap-4 grid-flow-row place-items-center opacity-0 group-hover/global:opacity-100  transition z-50 bg-transparent absolute right-0 top-0 bottom-0">
        <div className="block h-full relative w-3">
          <div
            className=" absolute w-3 rounded-xl inset-y-0"
            ref={scrollTrackRef}
            onClick={handleTrackClick}
            style={{ cursor: isDragging ? 'grabbing' : undefined }}
          ></div>
          <div
            className={` bg-neutral-700 absolute w-3 hover:brightness-125 transition ${
              isDragging ? 'bg-neutral-500' : ''
            }`}
            ref={scrollThumbRef}
            onMouseDown={handleThumbMousedown}
            style={{
              height: `${thumbHeight}px`,
            }}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default Scrollbar
