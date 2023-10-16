'use client'

import { useEffect } from 'react'

import useHeader from '@/stores/use-header'
import useNavStyles from '@/stores/use-nav-styles'

import { ScrollArea } from './ui/scroll-area'

interface PageWrapperProps {
  hasPlayBtn?: boolean
  children: React.ReactNode
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  const { setOpacity, setPlayBtnVisible } = useNavStyles()
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

export default PageWrapper
