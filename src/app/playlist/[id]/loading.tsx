'use client'

import { AiOutlineHeart } from 'react-icons/ai'
import Skeleton from 'react-loading-skeleton'

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import ListBarLoading from '@/components/LoadingLayout/ListBarLoading'
import MediaLoading from '@/components/LoadingLayout/MediaLoading'
import Navbar from '@/components/Navbar'
import PageWrapper from '@/components/PageWrapper'
import PlayButton from '@/components/PlayButton'
import useMainLayout from '@/stores/useMainLayout'

const Loading: React.FC = () => {
  const { width } = useMainLayout()
  return (
    <div className="relative h-full w-full">
      <Navbar bgColor={'#171717'} darker={false} />
      <PageWrapper>
        <Header bgColor={'#171717'}>
          <div className="flex flex-col items-center gap-x-5 md:flex-row">
            <div
              className={`${
                width <= 875 && '!h-[192px] !w-[193px]'
              } flex h-[233px] w-[232px]  items-center justify-center rounded-sm bg-[#282828] text-white shadow-[0_8px_24px_rgba(0,0,0,.5)] `}
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
        </Header>
        <div className="relative h-full overflow-hidden pb-8">
          <div className="relative flex w-full gap-x-6 p-5 px-10">
            <div
              style={{ backgroundColor: '#171717' }}
              className="header-bg-img-md absolute inset-x-0 top-0 z-0 h-[232px]"
            ></div>
            <PlayButton className="h-14 w-14 translate-y-0 opacity-100" />

            <div className="z-10 flex h-14 w-14 items-center justify-center">
              <button className={`items-center justify-center transition`}>
                <AiOutlineHeart
                  className={` text-neutral-400  transition hover:text-white`}
                  size={36}
                />
              </button>
            </div>
          </div>

          <div className="px-6 pb-2">
            <ListBarLoading />
            {Array(9)
              .fill(0)
              .map((_, index) => (
                <MediaLoading key={index} />
              ))}
          </div>
        </div>
        <Footer />
      </PageWrapper>
    </div>
  )
}

export default Loading
