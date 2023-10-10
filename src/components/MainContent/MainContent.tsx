'use client'

import Split from 'react-split'
import { twMerge } from 'tailwind-merge'
import Sidebar from '../Sidebar'
import { Playlist, Song } from '@/types/types'
import PlayingSidebar from '../PlayingSidebar/PlayingSidebar'

import usePlayingSidebar from '@/stores/usePlayingSidebar'
import usePlayer from '@/stores/usePlayer'
import { useEffect, useState } from 'react'
import GlobalLoading from '../LoadingLayout/GlobalLoading'
import MainLayout from './MainLayout'
import useUserStore from '@/stores/useUserStore'

interface MainContentProps {
  children: React.ReactNode
  songs: Song[]
  playlists: Playlist[]
  likedSongs: Song[]
  likedPlaylists: Playlist[]
}

const MainContent: React.FC<MainContentProps> = ({
  children,
  playlists,
  likedSongs,
  likedPlaylists,
}) => {
  const [isLoading, setLoading] = useState(true)
  const player = usePlayer()
  const { setLikedSongs, setLikedPlaylists } = useUserStore()

  const { isShowed } = usePlayingSidebar()

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 800)
  }, [])

  useEffect(() => {
    if (likedPlaylists.length !== 0) {
      setLikedPlaylists(likedPlaylists)
    }
  }, [likedPlaylists, setLikedPlaylists])

  useEffect(() => {
    if (likedSongs.length !== 0) {
      setLikedSongs(likedSongs)
    }
  }, [likedSongs, setLikedSongs])

  return (
    <>
      {isLoading ? (
        <GlobalLoading />
      ) : (
        <Split
          cursor="col-resize"
          minSize={isShowed ? [300, 400, 0] : [280, 600]}
          maxSize={isShowed ? [500, 99999, 400] : [500, 99999]}
          sizes={isShowed ? [20, 50, 30] : [20, 80]}
          gutterSize={8}
          snapOffset={20}
          className={twMerge(
            `flex flex-row w-full h-full `,
            player.activeId && 'h-[calc(100%-80px)]'
          )}
        >
          <Sidebar
            className="min-w-[280px] max-w-[500px]"
            playlists={playlists}
          />

          <MainLayout>
            <main className="h-full flex-grow overflow-y-auto py-2 relative">
              {children}
            </main>
          </MainLayout>

          {isShowed ? (
            <PlayingSidebar />
          ) : (
            <div className="w-2 absolute right-0 h-full"></div>
          )}
        </Split>
      )}
    </>
  )
}

export default MainContent
