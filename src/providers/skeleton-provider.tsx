'use client'

import 'react-loading-skeleton/dist/skeleton.css'

import { SkeletonTheme } from 'react-loading-skeleton'
import { useTheme } from 'next-themes'

type SkeletonProviderProps = {
  children: React.ReactNode
}

export const SkeletonProvider = ({ children }: SkeletonProviderProps) => {
  const { theme } = useTheme()

  const color = theme === 'dark' ? '#333' : '#d4d4d8'

  return (
    <SkeletonTheme baseColor={color} highlightColor="hsla(0,0%,100%,.1)">
      {children}
    </SkeletonTheme>
  )
}
