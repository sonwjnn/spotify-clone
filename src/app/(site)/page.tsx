import getSongs from '@/server-actions/songs/getSongs'
import HomeContent from './_components/HomeContent'
import NavbarHome from './_components/NavbarHome'
import PageWrapper from '@/components/PageWrapper'
import Greeting from '@/components/Greeting'
import Footer from '@/components/Footer'
import getPlaylists from '@/server-actions/playlists/getPlaylists'
import HeaderHome from './_components/HeaderHome'

export const revalidate = 0

const Home = async () => {
  const songs = await getSongs()
  const playlists = await getPlaylists()
  return (
    <div className="relative h-full w-full">
      <NavbarHome type="home" />
      <PageWrapper>
        <HeaderHome>
          <div className="mb-2">
            <Greeting playlists={playlists} />
          </div>
        </HeaderHome>
        <div className="mt-2 px-6">
          <div className="flex justify-between items-center">
            <h1 className="text-white text-2xl font-semibold">Newest songs</h1>
          </div>
          <HomeContent songs={songs} />
          <Footer />
        </div>
      </PageWrapper>
    </div>
  )
}

export default Home
