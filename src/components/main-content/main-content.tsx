'use client'

import { useEffect, useState } from 'react'

import { useUser } from '@/hooks/use-user'
import { usePlayer } from '@/stores/use-player'
import { useUserStore } from '@/stores/use-user-store'
import type { Playlist, Song } from '@/types/types'
import cn from '@/utils/cn'

import { GlobalLoading } from '../loading-layout/global-loading'
import { PlayingView } from '../playing-view/playing-view'
import { PlayingViewResizer } from '../playing-view/playing-view-resizer'
import { Sidebar } from '../sidebar'
import { SidebarResizer } from '../sidebar-resizer'
import { MainLayout } from './main-layout'

interface MainContentProps {
  children: React.ReactNode
  songs: Song[]
  playlists: Playlist[]
  likedSongs: Song[]
  likedPlaylists: Playlist[]
}

export const MainContent: React.FC<MainContentProps> = ({
  children,
  playlists,
  likedSongs,
  likedPlaylists,
}) => {
  const player = usePlayer()
  const { user } = useUser()
  const { setPlaylists, setLikedSongs, setLikedPlaylists } = useUserStore()

  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  useEffect(() => {
    if (playlists.length !== 0) {
      setPlaylists(playlists)
    }
  }, [playlists, setPlaylists])

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
      {!mounted ? (
        <GlobalLoading />
      ) : (
        <div
          className={cn(`flex  flex-row h-full`, {
            'h-[calc(100%-80px)]': user && player.activeId,
          })}
        >
          <SidebarResizer minWidth={300} maxWidth={500}>
            <Sidebar />
          </SidebarResizer>

          <MainLayout>
            <main className={`relative h-full grow overflow-y-auto py-2`}>
              {children}
            </main>
          </MainLayout>

          <PlayingViewResizer
            className={'hidden md:block'}
            minWidth={300}
            maxWidth={400}
          >
            <PlayingView />
          </PlayingViewResizer>
        </div>
      )}
    </>
  )
}
