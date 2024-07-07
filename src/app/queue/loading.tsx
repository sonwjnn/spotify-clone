'use client'

import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { ListBarLoading } from '@/components/loading-layout/list-bar-loading'
import { MediaLoading } from '@/components/loading-layout/media-loading'
import { Navbar } from '@/components/navbar'
import { PageWrapper } from '@/components/page-wrapper'

const loading = () => {
  return (
    <PageWrapper>
      <Navbar bgColor={'#171717'} darker={false} />
      <Header bgColor="#171717">
        <div className="mb-2 flex w-full flex-col  gap-y-6">
          <h1 className="pt-10 text-3xl font-semibold text-white">Queue</h1>
        </div>
      </Header>
      <div className="relative h-full overflow-hidden pb-8">
        <div className="m-0 mb-1 p-6 pt-0 text-base font-bold text-neutral-400">
          Now playing
        </div>
        <div className="px-6 pb-2">
          <MediaLoading />
        </div>
        <div className="mt-10 p-6 text-base font-bold text-neutral-400">
          Next
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
  )
}

export default loading
