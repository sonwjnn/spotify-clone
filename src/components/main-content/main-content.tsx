'use client'

import { useEffect, useState } from 'react'

import { useUser } from '@/hooks/use-user'
import { usePlayer } from '@/stores/use-player'
import { useUserStore } from '@/stores/use-user-store'
import type { Playlist, Song } from '@/types/types'
import cn from '@/utils/cn'

import { GlobalLoading } from '../loading-layout/global-loading'
import { PlayingView } from '../playing-view/playing-view'
import { ResizePlayingBox } from '../resize-playing-box'
import { ResizeSizebarBox } from '../resize-sidebar-box'
import { Sidebar } from '../sidebar'
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
  const [isLoading, setLoading] = useState(true)
  const player = usePlayer()
  const { user } = useUser()
  const { setLikedSongs, setLikedPlaylists } = useUserStore()

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 800)

    return () => clearTimeout(timer)
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
            'h-[calc(100%-80px)]': user && player.activeId,
          })}
        >
          {/* <Sidebar playlists={playlists} /> */}
          <ResizeSizebarBox minWidth={300} maxWidth={500}>
            <Sidebar playlists={playlists} />
          </ResizeSizebarBox>

          <MainLayout>
            <main className={`relative h-full grow overflow-y-auto py-2`}>
              {children}
            </main>
          </MainLayout>

          <ResizePlayingBox
            className={'hidden md:block'}
            minWidth={300}
            maxWidth={400}
          >
            <PlayingView />
          </ResizePlayingBox>
        </div>
      )}
    </>
  )
}
