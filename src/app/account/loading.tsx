'use client'

import Skeleton from 'react-loading-skeleton'

import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { Navbar } from '@/components/navbar'
import { PageWrapper } from '@/components/page-wrapper'

const Loading = () => {
  return (
    <PageWrapper>
      <Navbar bgColor={'#171717'} darker={false} />
      <Header bgColor={'#171717'}>
        <div className="mb-2 flex w-full flex-col gap-y-6  pt-10">
          <Skeleton height={'46px'} width={'200px'} borderRadius={50} />
        </div>
      </Header>
      <div className="mb-7 px-6">
        <div className="flex flex-col gap-y-4">
          <Skeleton height={'100%'} width={'30%'} borderRadius={50} />
          <Skeleton height={'50px'} width={'300px'} borderRadius={50} />
        </div>
      </div>
      <Footer />
    </PageWrapper>
  )
}

export default Loading
