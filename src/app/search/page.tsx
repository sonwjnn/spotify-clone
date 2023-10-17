import type { NextPage } from 'next'

import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { Navbar } from '@/components/navbar'
import { PageWrapper } from '@/components/page-wrapper'
import { SearchInput } from '@/components/search-input'
import { getSongsByTitle } from '@/server-actions/songs/get-songs-by-title'

import { SearchContent } from './_components/search-content'

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
          <h1 className="pt-10 text-3xl font-semibold text-white">Search</h1>
          <SearchInput url="/search" />
        </div>
      </Header>
      <SearchContent songs={songs} />
      <Footer />
    </PageWrapper>
  )
}

export default SearchPage
