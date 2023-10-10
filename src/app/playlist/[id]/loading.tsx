'use client'

import Footer from '@/components/Footer'
import HeaderLoading from '@/components/LoadingLayout/HeaderLoading'
import MediaLoading from '@/components/LoadingLayout/MediaLoading'
import useMainLayout from '@/stores/useMainLayout'
import Skeleton from 'react-loading-skeleton'

const Loading = () => {
  const { width } = useMainLayout()
  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:[width:0px]">
      <HeaderLoading className="from-neutral-600">
        <div className="flex flex-row md:flex-row items-center gap-x-5">
          <div
            className={`${
              width <= 875 && '!h-[192px] !w-[193px]'
            } h-[233px] w-[232px] text-white bg-[#282828] rounded-sm flex items-center justify-center shadow-[0_8px_24px_rgba(0,0,0,.5)] `}
          >
            <Skeleton height={'100%'} />
          </div>
          <div className="flex flex-col self-end grow  gap-y-2 mt-4 md:mt-0">
            <p className="hidden md:block  text-base w-[100px]">
              <Skeleton height={'20px'} borderRadius={50} />
            </p>
            <h1
              className={` text-white  text-7xl font-bold cursor-pointer w-[400px]`}
            >
              <Skeleton height={'48px'} borderRadius={50} />
            </h1>

            <p className="hidden md:block text-sm w-[100px]">
              <Skeleton height={'20px'} borderRadius={50} />
            </p>
            <p className="hidden md:block text-sm w-[200px]">
              <Skeleton height={'20px'} borderRadius={50} />
            </p>
          </div>
        </div>
      </HeaderLoading>
      <div className="flex flex-col gap-y-2 w-full p-6">
        {Array(4)
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
