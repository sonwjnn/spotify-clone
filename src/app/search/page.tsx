import getSongsByTitle from '@/server-actions/songs/getSongsByTitle'
import Header from '@/components/Header'
import SearchInput from '@/components/SearchInput'
import SearchContent from './_components/SearchContent'
import Navbar from '@/components/Navbar'
import PageWrapper from '@/components/PageWrapper'
import Footer from '@/components/Footer'

interface SearchProps {
  searchParams: {
    title: string
  }
}

export const revalidate = 0

const Search = async ({ searchParams }: SearchProps) => {
  const songs = await getSongsByTitle(searchParams.title)

  return (
    <PageWrapper>
      <Navbar bgColor={'#171717'} darker={false} />
      <Header type="search" bgColor="#171717">
        <div className="mb-2 flex flex-col gap-y-6  w-full">
          <h1 className="text-white text-3xl font-semibold">Search</h1>
          <SearchInput url="/search" />
        </div>
      </Header>
      <SearchContent songs={songs} />
      <Footer />
    </PageWrapper>
  )
}

export default Search
