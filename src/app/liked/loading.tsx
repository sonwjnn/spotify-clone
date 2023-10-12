'use client'

import Skeleton from 'react-loading-skeleton'

import HeaderLoading from '@/components/LoadingLayout/HeaderLoading'
import MediaLoading from '@/components/LoadingLayout/MediaLoading'

const Loading: React.FC = () => {
  return (
    <div className="h-full w-full overflow-hidden overflow-y-auto rounded-lg bg-neutral-900 [&::-webkit-scrollbar]:[width:0px]">
      <HeaderLoading className="from-emerald-800">
        <div className="flex flex-col items-center gap-x-5 md:flex-row">
          <div className="relative h-32 w-32 lg:h-44 lg:w-44">
            <Skeleton height={'100%'} />
          </div>
          <div className="mt-4 flex flex-col gap-y-2 md:mt-0 ">
            <p className="hidden w-[80px] text-sm font-semibold md:block">
              <Skeleton height={'20px'} borderRadius={50} />
            </p>
            <h1 className="w-[265px] text-4xl font-bold text-white sm:text-5xl lg:text-7xl">
              <Skeleton height={'48px'} borderRadius={50} />
            </h1>
          </div>
        </div>
      </HeaderLoading>
      <div className="flex w-full flex-col gap-y-2 p-6">
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <MediaLoading key={index} />
          ))}
      </div>
    </div>
  )
}

export default Loading
