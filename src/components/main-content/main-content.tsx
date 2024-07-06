'use client'

import { useEffect, useState } from 'react'

import { usePlayer } from '@/store/use-player'
import { useUser } from '@/hooks/use-user'
import { useUserStore } from '@/store/use-user-store'
import type { Playlist, Song } from '@/types/types'
import { cn } from '@/lib/utils'

import { GlobalLoading } from '@/components/loading-layout/global-loading'
import { PlayingView } from '@/components/playing-view/playing-view'
import { Sidebar } from '@/components/sidebar/sidebar'
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
          className={cn(`flex  h-full flex-row`, {
            'h-[calc(100%-80px)]': user && player.activeId,
          })}
        >
          <Sidebar />

          <MainLayout>
            <main
              className={`relative h-full grow overflow-y-auto bg-white py-2 dark:bg-black`}
            >
              {children}
            </main>
          </MainLayout>

          <PlayingView />
        </div>
      )}
    </>
  )
}
