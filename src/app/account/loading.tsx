'use client'

import Skeleton from 'react-loading-skeleton'

import Footer from '@/components/footer'
import HeaderLoading from '@/components/loading-layout/header-loading'

const Loading: React.FC = () => {
  return (
    <div className="h-full w-full overflow-hidden overflow-y-auto rounded-lg bg-neutral-900">
      <HeaderLoading>
        <div className="mb-2 flex flex-col gap-y-6 ">
          <div className="text-3xl font-semibold text-white">
            <Skeleton height={'100%'} width={'50%'} borderRadius={50} />
          </div>
        </div>
      </HeaderLoading>
      <div className="mb-7 px-6">
        <div className="flex flex-col gap-y-4">
          <Skeleton height={'100%'} width={'30%'} borderRadius={50} />
          <Skeleton height={'50px'} width={'300px'} borderRadius={50} />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Loading
