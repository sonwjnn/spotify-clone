'use client'

import { useEffect, useState } from 'react'
import Split from 'react-split'
import { twMerge } from 'tailwind-merge'

import usePlayer from '@/stores/usePlayer'
import usePlayingSidebar from '@/stores/usePlayingSidebar'
import useUserStore from '@/stores/useUserStore'
import type { Playlist, Song } from '@/types/types'

import GlobalLoading from '../LoadingLayout/GlobalLoading'
import PlayingSidebar from '../PlayingSidebar/PlayingSidebar'
import Sidebar from '../Sidebar'
import MainLayout from './MainLayout'

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
            <main className="relative h-full grow overflow-y-auto py-2">
              {children}
            </main>
          </MainLayout>

          {isShowed ? (
            <PlayingSidebar />
          ) : (
            <div className="absolute right-0 h-full w-2"></div>
          )}
        </Split>
      )}
    </>
  )
}

export default MainContent
