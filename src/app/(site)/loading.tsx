'use client'

import Skeleton from 'react-loading-skeleton'
import useMainLayout from '@/stores/useMainLayout'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Navbar from '@/components/Navbar'
import PageWrapper from '@/components/PageWrapper'
import useHeader from '@/stores/useHeader'

const Loading = () => {
  const { width, quantityCol } = useMainLayout()
  const { bgColor } = useHeader()
  return (
    <div className="bg-neutral-900 rounded-lg relative h-full w-full overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:[width:0px]">
      <Navbar bgColor={bgColor} />
      <PageWrapper>
        <Header className="from-emerald-800">
          <div className="mb-2 w-full">
            <h1 className="text-white text-3xl font-semibold w-[200px]">
              <Skeleton height={'100%'} />
            </h1>
            <div
              className={`grid ${width <= 519 && '!grid-cols-1'} ${
                width <= 878 && 'grid-cols-2'
              } grid-cols-3 gap-3 mt-4`}
            >
              {Array(6)
                .fill(0)
                .map((_, index) => (
                  <button
                    key={index}
                    className="relative h-[80px]  group flex items-center rounded-md overflow-hidden gap-x-4 bg-neutral-100/10  hover:bg-neutral-100/20 transition pr-4"
                  >
                    <div className="relative  min-w-[80px]">
                      <Skeleton height={'80px'} width={'100%'} />
                    </div>
                    <p className="font-medium truncate py-5  w-[200px]">
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

        <div className="mt-2 mb-7 px-6">
          <div className="flex justify-between items-center">
            <h1 className="text-white text-2xl font-semibold">
              <Skeleton height={'100%'} borderRadius={50} />
            </h1>
          </div>
          <div
            className="grid  gap-4 mt-4"
            style={{
              gridTemplateColumns: `repeat(${quantityCol}, minmax(0,1fr))`,
            }}
          >
            {Array(8)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="relative flex flex-col group items-center justify-center rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10 transition p-3"
                >
                  <div className="relative aspect-square h-full w-full rounded-md overflow-hidden">
                    <Skeleton height={'100%'} width={'100%'} />
                  </div>

                  <div className="flex flex-col items-start w-full pt-4 gap-y-1">
                    <p className="truncate font-semibold w-full">
                      <Skeleton
                        height={'100%'}
                        width={'100%'}
                        borderRadius={50}
                      />
                    </p>
                    <p className="text-neutral-400 text-sm pb-4 w-full truncate">
                      <Skeleton
                        height={'100%'}
                        width={'50%'}
                        borderRadius={50}
                      />
                    </p>
                  </div>
                </div>
              ))}
          </div>
          <Footer />
        </div>
      </PageWrapper>
    </div>
  )
}

export default Loading
