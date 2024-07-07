'use client'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { LuAlignJustify } from 'react-icons/lu'
import { StaticSidebar } from '@/components/static-sidebar'

const MobileToggle = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="sm:hidden">
          <LuAlignJustify />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex gap-0 p-0">
        <StaticSidebar />
      </SheetContent>
    </Sheet>
  )
}

export default MobileToggle
