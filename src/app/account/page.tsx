import Header from '@/components/Header'
import AccountContent from './_components/AccountContent'
import Navbar from '@/components/Navbar'
import PageWrapper from '@/components/PageWrapper'
import Footer from '@/components/Footer'

const Account = () => {
  return (
    <div className="relative h-full w-full">
      <Navbar bgColor="#171717" darker={false} />
      <PageWrapper>
        <Header type="account" bgColor={'#171717'}>
          <div className="mb-2 flex flex-col gap-y-6 ">
            <div className="text-white text-3xl font-semibold">
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
