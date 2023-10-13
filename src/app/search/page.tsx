import type { NextPage } from 'next'

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Navbar from '@/components/Navbar'
import PageWrapper from '@/components/PageWrapper'
import SearchInput from '@/components/SearchInput'
import getSongsByTitle from '@/server-actions/songs/getSongsByTitle'

import SearchContent from './_components/SearchContent'

interface SearchPageProps {
  searchParams: {
    title: string
  }
}

export const revalidate = 0

const SearchPage: NextPage<SearchPageProps> = async ({
  searchParams,
}: SearchPageProps) => {
  const songs = await getSongsByTitle(searchParams.title)

  return (
    <PageWrapper>
      <Navbar bgColor={'#171717'} darker={false} />
      <Header type="search" bgColor="#171717">
        <div className="mb-2 flex w-full flex-col  gap-y-6">
          <h1 className="text-3xl font-semibold text-white">Search</h1>
          <SearchInput url="/search" />
        </div>
      </Header>
      <SearchContent songs={songs} />
      <Footer />
    </PageWrapper>
  )
}

export default SearchPage
