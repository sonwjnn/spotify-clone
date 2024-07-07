'use client'

import { useEffect, useRef } from 'react'

import { useComponentSize } from '@/store/use-component-size'
import { useMainLayout } from '@/store/use-main-layout'

type MainLayoutProps = {
  children: React.ReactNode
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  useEffect(() => {
    useMainLayout.persist.rehydrate()
  }, [])
  const { setQuantityCol, setWidth } = useMainLayout()
  const mainRef = useRef<HTMLDivElement>(null)

  const size = useComponentSize(mainRef)

  useEffect(() => {
    if (size.width < 340) setQuantityCol(1)
    else if (size.width < 548) setQuantityCol(2)
    else if (size.width < 748) setQuantityCol(3)
    else if (size.width < 995) setQuantityCol(4)
    else if (size.width < 1248) setQuantityCol(5)
    else if (size.width < 1448) setQuantityCol(6)
    else if (size.width < 1648) setQuantityCol(7)
    else if (size.width < 1868) setQuantityCol(8)
    else setQuantityCol(9)

    setWidth(size.width)
  }, [size.width, setWidth, setQuantityCol])

  return (
    <div className="flex-1" ref={mainRef}>
      {children}
    </div>
  )
}
