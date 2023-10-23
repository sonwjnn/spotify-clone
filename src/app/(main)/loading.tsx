'use client'

import Skeleton from 'react-loading-skeleton'

import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { CardLoading } from '@/components/loading-layout/card-loading'
import { Navbar } from '@/components/navbar'
import { PageWrapper } from '@/components/page-wrapper'
import { useHeader } from '@/stores/use-header'
import { useMainLayout } from '@/stores/use-main-layout'

const Loading: React.FC = () => {
  const { width, quantityCol } = useMainLayout()
  const { bgColor } = useHeader()
  return (
    <PageWrapper>
      <Navbar type="home" bgColor={bgColor} />
      <Header type="home" className="from-emerald-800">
        <div className="mb-2 w-full">
          <h1 className="w-[200px] text-3xl font-semibold text-white">
            <Skeleton height={'100%'} borderRadius={50} />
          </h1>
          <div
            className={`grid ${width <= 519 && '!grid-cols-1'} ${
              width <= 878 && 'grid-cols-2'
            } mt-4 grid-cols-3 gap-3`}
          >
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <button
                  key={index}
                  className="group relative  flex h-[80px] items-center gap-x-4 overflow-hidden rounded-md bg-neutral-100/10  pr-4 transition hover:bg-neutral-100/20"
                >
                  <div className="relative  min-w-[80px]">
                    <Skeleton height={'80px'} width={'100%'} />
                  </div>
                  <p className="w-[200px] truncate py-5  font-medium">
                    <Skeleton
                      height={'100%'}
                      borderRadius={50}
                      width={'100%'}
                    />
                  </p>
                </button>
              ))}
          </div>
        </div>
      </Header>

      <div className="mb-7 mt-2 px-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-white">
            <Skeleton height={'100%'} borderRadius={50} />
          </h1>
        </div>
        <div
          className="mt-4  grid gap-4"
          style={{
            gridTemplateColumns: `repeat(${quantityCol}, minmax(0,1fr))`,
          }}
        >
          {Array(8)
            .fill(0)
            .map((_, index) => (
              <CardLoading key={index} />
            ))}
        </div>
        <Footer />
      </div>
    </PageWrapper>
  )
}

export default Loading
