'use client'

import { Button } from '@/components/ui/button'
import { LuAlignJustify } from 'react-icons/lu'
import { useSidebarSheet } from '@/store/use-sidebar-sheet'

const MobileToggle = () => {
  const { onOpen } = useSidebarSheet()

  return (
    <Button className="sm:hidden" onClick={() => onOpen()}>
      <LuAlignJustify />
    </Button>
  )
}

export default MobileToggle
