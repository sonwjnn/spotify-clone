'use client'

import { SidebarSheet } from '@/components/sheets/sidebar-sheet'
import { useMountedState } from 'react-use'

const SheetProvider = () => {
  const isMounted = useMountedState()

  if (!isMounted()) return null

  return (
    <>
      <SidebarSheet />
    </>
  )
}

export default SheetProvider
