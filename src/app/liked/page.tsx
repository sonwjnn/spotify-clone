import type { NextPage } from 'next'

import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { Navbar } from '@/components/navbar'
import { PageWrapper } from '@/components/page-wrapper'

import { HeaderContent } from './_components/header-content'
import { LikedContent } from './_components/liked-content'

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
