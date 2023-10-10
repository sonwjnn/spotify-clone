'use client'

import { BounceLoader } from 'react-spinners'
import Box from '../Box'

const GlobalLoading: React.FC = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Box className=" h-[calc(100%-16px)] w-[calc(100%-16px)] flex items-center justify-center gap-x-2  ">
        <BounceLoader color="#22c55e" size={40} />
        <BounceLoader color="#22c55e" size={40} />
        <BounceLoader color="#22c55e" size={40} />
      </Box>
    </div>
  )
}

export default GlobalLoading
