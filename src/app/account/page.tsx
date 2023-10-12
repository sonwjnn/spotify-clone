import type { NextPage } from 'next'

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Navbar from '@/components/Navbar'
import PageWrapper from '@/components/PageWrapper'

import AccountContent from './_components/AccountContent'

const Account: NextPage = () => {
  return (
    <div className="relative h-full w-full">
      <Navbar bgColor="#171717" darker={false} />
      <PageWrapper>
        <Header type="account" bgColor={'#171717'}>
          <div className="mb-2 flex flex-col gap-y-6 ">
            <div className="text-3xl font-semibold text-white">
              Account Settings
            </div>
          </div>
        </Header>
        <AccountContent />
        <Footer />
      </PageWrapper>
    </div>
  )
}

export default Account
