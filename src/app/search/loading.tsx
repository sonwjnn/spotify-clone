'use client'

import Footer from '@/components/Footer'
import HeaderLoading from '@/components/LoadingLayout/HeaderLoading'
import MediaLoading from '@/components/LoadingLayout/MediaLoading'
import Skeleton from 'react-loading-skeleton'

const Loading = () => {
  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:[width:0px]">
      <HeaderLoading className="from-bg-neutral-900">
        <div className="mb-2 flex flex-col gap-y-6">
          <h1 className="text-white text-3xl font-semibold w-[200px]">
            <Skeleton height={'46px'} borderRadius={50} />
          </h1>
          <Skeleton height={'46px'} borderRadius={8} />
        </div>
      </HeaderLoading>
      <div className="flex flex-col gap-y-2 w-full p-6">
        {Array(6)
          .fill(0)
          .map((item, index) => (
            <MediaLoading key={index} />
          ))}
      </div>
      <Footer />
    </div>
  )
}

export default Loading
