'use client'

import { useEffect } from 'react'

import { useHeader } from '@/store/use-header'
import { useNavbar } from '@/store/use-navbar'

import { ScrollArea } from './ui/scroll-area'

interface PageWrapperProps {
  hasPlayBtn?: boolean
  children: React.ReactNode
}

export const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  const { setOpacity, setPlayBtnVisible, setUsernameVisible } = useNavbar()
  const { height } = useHeader()

  useEffect(() => {
    setPlayBtnVisible(false)
    setOpacity(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>): void => {
    const yAxis = e.currentTarget.scrollTop

    if (yAxis > 64) {
      setOpacity(1)
    } else {
      setOpacity(yAxis / 64)
    }

    if (yAxis > height + 14) {
      setPlayBtnVisible(true)
    } else setPlayBtnVisible(false)

    if (yAxis > height) {
      setUsernameVisible(true)
    } else setUsernameVisible(false)
  }

  return (
    <ScrollArea
      className="relative h-full w-full rounded-lg bg-neutral-900"
      onScroll={handleScroll}
    >
      {children}
    </ScrollArea>
  )
}
