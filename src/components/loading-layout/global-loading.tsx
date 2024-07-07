'use client'

import { SyncLoader } from 'react-spinners'

import { Box } from '@/components/ui/box'

export const GlobalLoading = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Box className=" flex h-[calc(100%-16px)] w-[calc(100%-16px)] items-center justify-center gap-x-2  ">
        <SyncLoader speedMultiplier={0.5} color="#22c55e" size={40} />
      </Box>
    </div>
  )
}
