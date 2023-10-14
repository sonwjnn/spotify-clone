'use client'

import Skeleton from 'react-loading-skeleton'

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import ListBarLoading from '@/components/LoadingLayout/ListBarLoading'
import MediaLoading from '@/components/LoadingLayout/MediaLoading'
import Navbar from '@/components/Navbar'
import PageWrapper from '@/components/PageWrapper'

const Loading: React.FC = () => {
  return (
    <div className="relative h-full w-full">
      <Navbar bgColor={'#171717'} darker={false} />
      <PageWrapper>
        <Header bgColor="#171717">
          <div className="mb-2 flex w-full flex-col  gap-y-6">
            <h1 className="pt-10 text-3xl font-semibold text-white">Search</h1>
            <Skeleton height={'46px'} width={'100%'} borderRadius={50} />
          </div>
        </Header>
        <div className="relative h-full overflow-hidden pb-8">
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
