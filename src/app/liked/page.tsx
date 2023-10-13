import type { NextPage } from 'next'

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Navbar from '@/components/Navbar'
import PageWrapper from '@/components/PageWrapper'

import HeaderContent from './_components/HeaderContent'
import LikedContent from './_components/LikedContent'

const LikedPage: NextPage = async () => {
  return (
    <PageWrapper>
      <Navbar bgColor="#543ca2" />
      <Header type="playlist" bgColor="#543ca2">
        <HeaderContent />
      </Header>

      <LikedContent bgColor="#543ca2" />
      <Footer />
    </PageWrapper>
  )
}
export default LikedPage
