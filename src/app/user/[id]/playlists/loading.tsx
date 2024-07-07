'use client'

import Skeleton from 'react-loading-skeleton'

import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { CardLoading } from '@/components/loading-layout/card-loading'
import { Navbar } from '@/components/navbar'
import { PageWrapper } from '@/components/page-wrapper'
import { useMainLayout } from '@/store/use-main-layout'

const Loading = () => {
  const { quantityCol } = useMainLayout()
  return (
    <PageWrapper>
      <Navbar bgColor={'#171717'} darker={false} />
      <Header bgColor={'#171717'}>
        <div className="mb-2 flex w-full flex-col gap-y-6  pt-10">
          <Skeleton height={'46px'} width={'200px'} borderRadius={50} />
        </div>
      </Header>
      <div className="relative h-full overflow-hidden pb-8">
        <div className="px-6 pb-2">
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
        </div>
      </div>
      <Footer />
    </PageWrapper>
  )
}

export default Loading
