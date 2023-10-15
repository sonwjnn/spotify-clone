'use client'

import { useEffect, useState } from 'react'

import usePlayer from '@/stores/usePlayer'
import useUserStore from '@/stores/useUserStore'
import type { Playlist, Song } from '@/types/types'
import cn from '@/utils/cn'

import GlobalLoading from '../LoadingLayout/GlobalLoading'
import PlayingResize from '../PlayingResize'
import PlayingView from '../PlayingView/PlayingView'
import Sidebar from '../Sidebar'
import SidebarResize from '../SidebarResize'
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
          className={cn(`flex  flex-row h-full`, {
            'h-[calc(100%-80px)]': player.activeId,
          })}
        >
          {/* <Sidebar playlists={playlists} /> */}
          <SidebarResize minWidth={300} maxWidth={500}>
            <Sidebar playlists={playlists} />
          </SidebarResize>

          <MainLayout>
            <main className={`relative h-full grow overflow-y-auto py-2`}>
              {children}
            </main>
          </MainLayout>

          <PlayingResize
            className={'hidden md:block'}
            minWidth={300}
            maxWidth={400}
          >
            <PlayingView />
          </PlayingResize>
        </div>
      )}
    </>
  )
}

export default MainContent
