import type { NextPage } from 'next'

import Footer from '@/components/Footer'
import Greeting from '@/components/Greeting'
import Header from '@/components/Header'
import Navbar from '@/components/Navbar'
import PageWrapper from '@/components/PageWrapper'
import getPlaylists from '@/server-actions/playlists/getPlaylists'
import getSongs from '@/server-actions/songs/getSongs'

import HomeContent from './_components/HomeContent'

export const revalidate = 0

const Home: NextPage = async () => {
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
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-white">Newest songs</h1>
        </div>
        <HomeContent songs={songs} />
        <Footer />
      </div>
    </PageWrapper>
  )
}

export default Home
