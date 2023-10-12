'use client'

import { BounceLoader } from 'react-spinners'

import Box from '../ui/Box'

const GlobalLoading: React.FC = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Box className=" flex h-[calc(100%-16px)] w-[calc(100%-16px)] items-center justify-center gap-x-2  ">
        <BounceLoader color="#22c55e" size={40} />
        <BounceLoader color="#22c55e" size={40} />
        <BounceLoader color="#22c55e" size={40} />
      </Box>
    </div>
  )
}

export default GlobalLoading
