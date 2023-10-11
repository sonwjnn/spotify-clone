import getSongs from '@/server-actions/songs/getSongs'
import HomeContent from './_components/HomeContent'
import PageWrapper from '@/components/PageWrapper'
import Greeting from '@/components/Greeting'
import Footer from '@/components/Footer'
import getPlaylists from '@/server-actions/playlists/getPlaylists'
import Navbar from '@/components/Navbar'
import Header from '@/components/Header'

export const revalidate = 0

const Home = async () => {
  const songs = await getSongs()
  const playlists = await getPlaylists()
  return (
    <PageWrapper>
      <Navbar type="home" />
      <Header type="home">
        <div className="mb-2 w-full">
          <Greeting playlists={playlists} />
        </div>
      </Header>
      <div className="mt-2 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">Newest songs</h1>
        </div>
        <HomeContent songs={songs} />
        <Footer />
      </div>
    </PageWrapper>
  )
}

export default Home
