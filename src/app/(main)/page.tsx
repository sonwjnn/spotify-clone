import type { NextPage } from 'next'

import Footer from '@/components/Footer'
import Greeting from '@/components/Greeting'
import Header from '@/components/Header'
import getPlaylists from '@/server-actions/playlists/getPlaylists'
import getSongs from '@/server-actions/songs/getSongs'

import MainContent from './_components/MainContent'

export const revalidate = 0

const MainPage: NextPage = async () => {
  const songs = await getSongs()
  const playlists = await getPlaylists()
  return (
    <div className="h-full w-full">
      <Header type="home">
        <div className="mb-2 w-full">
          <Greeting playlists={playlists} />
        </div>
      </Header>
      <div className="mt-2 px-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-white">Newest songs</h1>
        </div>
        <MainContent songs={songs} />
        <Footer />
      </div>
    </div>
  )
}

export default MainPage
