'use client'

import { useEffect, useState } from 'react'

import usePlayer from '@/stores/usePlayer'
import usePlayingSidebar from '@/stores/usePlayingSidebar'
import useUserStore from '@/stores/useUserStore'
import type { Playlist, Song } from '@/types/types'
import cn from '@/utils/cn'

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
        <div
          className={cn(`flex flex-row h-full`, {
            'h-[calc(100%-80px)]': player.activeId,
          })}
        >
          <Sidebar playlists={playlists} />

          <MainLayout>
            <main
              className={cn(`relative h-full grow overflow-y-auto py-2`, {
                'pr-2': !isShowed,
              })}
            >
              {children}
            </main>
          </MainLayout>

          <PlayingSidebar />
        </div>
      )}
    </>
  )
}

export default MainContent
