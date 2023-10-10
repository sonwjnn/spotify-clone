import Header from '@/components/Header'
import QueueContent from './_components/QueueContent'
import Navbar from '@/components/Navbar'
import PageWrapper from '@/components/PageWrapper'
import Footer from '@/components/Footer'

export const revalidate = 0

const Queue = async () => {
  return (
    <div className="relative h-full w-full">
      <Navbar bgColor={'#171717'} darker={false} />
      <PageWrapper>
        <Header bgColor="#171717">
          <div className="mb-2 flex flex-col gap-y-6  w-full">
            <h1 className="text-white text-3xl font-semibold pt-10">Queue</h1>
          </div>
        </Header>
        <QueueContent />
        <Footer />
      </PageWrapper>
    </div>
  )
}

export default Queue
