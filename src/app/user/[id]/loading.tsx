'use client'

import Skeleton from 'react-loading-skeleton'

import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { CardLoading } from '@/components/loading-layout/card-loading'
import { Navbar } from '@/components/navbar'
import { PageWrapper } from '@/components/page-wrapper'
import { useMainLayout } from '@/store/use-main-layout'

const Loading = () => {
  const { width, quantityCol } = useMainLayout()
  return (
    <PageWrapper>
      <Navbar bgColor={'#171717'} darker={false} hasUsername />
      <Header bgColor={'#171717'}>
        <div className="flex flex-col items-center gap-x-5 md:flex-row">
          <div
            className={`${
              width <= 875 && '!h-[192px] !w-[193px]'
            } flex h-[233px] w-[232px]  items-center justify-center rounded-full bg-[#282828] text-white shadow-[0_8px_24px_rgba(0,0,0,.5)] `}
          >
            <Skeleton height={'100%'} borderRadius={50} />
          </div>
          <div className="mt-4 flex grow flex-col  gap-y-2 self-end md:mt-0">
            <p className="hidden w-[100px]  text-base md:block">
              <Skeleton height={'20px'} borderRadius={50} />
            </p>
            <h1
              className={`w-[200px]  cursor-pointer text-7xl font-bold text-white`}
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
            className="header-bg-img-md-light dark:header-bg-img-md absolute inset-x-0 top-0 z-0 h-[232px]"
          ></div>

          <div className="z-10 flex h-14 w-14 items-center justify-center"></div>
        </div>

        <div className="px-6 pb-2">
          <Skeleton height={'36px'} width={'150px'} borderRadius={50} />
          <div
            className="mt-4  grid gap-4"
            style={{
              gridTemplateColumns: `repeat(${quantityCol}, minmax(0,1fr))`,
            }}
          >
            {Array(quantityCol)
              .fill(0)
              .map((_, index) => (
                <CardLoading key={index} />
              ))}
          </div>
        </div>
      </div>
      <Footer />
    </PageWrapper>
  )
}

export default Loading
