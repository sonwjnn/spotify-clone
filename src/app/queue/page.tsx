import type { NextPage } from 'next'

import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { Navbar } from '@/components/navbar'
import { PageWrapper } from '@/components/page-wrapper'

import { QueueContent } from './_components/queue-content'

export const revalidate = 0

const QueuePage: NextPage = async () => {
  return (
    <div className="relative h-full w-full">
      <Navbar bgColor="#171717" darker={false} />
      <PageWrapper>
        <Header bgColor="#171717" type="queue">
          <div className="mb-2 flex w-full flex-col  gap-y-6">
            <h1 className="pt-10 text-3xl font-semibold text-zinc-600 dark:text-white">
              Queue
            </h1>
          </div>
        </Header>
        <QueueContent />
        <Footer />
      </PageWrapper>
    </div>
  )
}

export default QueuePage
