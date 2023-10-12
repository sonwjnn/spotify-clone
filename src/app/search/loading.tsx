'use client'

import Skeleton from 'react-loading-skeleton'

import Footer from '@/components/Footer'
import HeaderLoading from '@/components/LoadingLayout/HeaderLoading'
import MediaLoading from '@/components/LoadingLayout/MediaLoading'

const Loading: React.FC = () => {
  return (
    <div className="h-full w-full overflow-hidden overflow-y-auto rounded-lg bg-neutral-900 [&::-webkit-scrollbar]:[width:0px]">
      <HeaderLoading>
        <div className="mb-2 flex flex-col gap-y-6">
          <h1 className="w-[200px] text-3xl font-semibold text-white">
            <Skeleton height={'46px'} borderRadius={50} />
          </h1>
          <Skeleton height={'46px'} borderRadius={8} />
        </div>
      </HeaderLoading>
      <div className="flex w-full flex-col gap-y-2 p-6">
        {Array(6)
          .fill(0)
          .map((_, index) => (
            <MediaLoading key={index} />
          ))}
      </div>
      <Footer />
    </div>
  )
}

export default Loading
