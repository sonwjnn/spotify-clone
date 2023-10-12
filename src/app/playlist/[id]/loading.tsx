'use client'

import Skeleton from 'react-loading-skeleton'

import Footer from '@/components/Footer'
import HeaderLoading from '@/components/LoadingLayout/HeaderLoading'
import MediaLoading from '@/components/LoadingLayout/MediaLoading'
import useMainLayout from '@/stores/useMainLayout'

const Loading: React.FC = () => {
  const { width } = useMainLayout()
  return (
    <div className="h-full w-full overflow-hidden overflow-y-auto rounded-lg bg-neutral-900 [&::-webkit-scrollbar]:[width:0px]">
      <HeaderLoading className="from-neutral-600">
        <div className="flex flex-row items-center gap-x-5 md:flex-row">
          <div
            className={`${
              width <= 875 && '!h-[192px] !w-[193px]'
            } flex h-[233px] w-[232px] items-center justify-center rounded-sm bg-[#282828] text-white shadow-[0_8px_24px_rgba(0,0,0,.5)] `}
          >
            <Skeleton height={'100%'} />
          </div>
          <div className="mt-4 flex grow flex-col  gap-y-2 self-end md:mt-0">
            <p className="hidden w-[100px]  text-base md:block">
              <Skeleton height={'20px'} borderRadius={50} />
            </p>
            <h1
              className={` w-[400px]  cursor-pointer text-7xl font-bold text-white`}
            >
              <Skeleton height={'48px'} borderRadius={50} />
            </h1>

            <p className="hidden w-[100px] text-sm md:block">
              <Skeleton height={'20px'} borderRadius={50} />
            </p>
            <p className="hidden w-[200px] text-sm md:block">
              <Skeleton height={'20px'} borderRadius={50} />
            </p>
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
      <Footer />
    </div>
  )
}

export default Loading
