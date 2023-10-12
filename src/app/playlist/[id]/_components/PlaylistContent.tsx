'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { useUser } from '@/hooks/useUser'
import type { Playlist, Song } from '@/types/types'

import SearchPlaylist from './SearchPlaylist'
import SongPlaylist from './SongPlaylist'

interface PlaylistContentProps {
  playlist: Playlist
  songs: Song[]
  addedSongs: Song[]
}

const PlaylistContent: React.FC<PlaylistContentProps> = ({
  playlist,
  songs,
  addedSongs,
}) => {
  const { user, isLoading } = useUser()

  const router = useRouter()
  const unaddedSongs = songs.filter(
    (song: Song) => !playlist?.song_ids?.includes(song.id)
  )

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/')
    }
  }, [isLoading, user, router])

  return (
    <>
      <SongPlaylist songs={addedSongs} playlist={playlist} />
      <SearchPlaylist songs={unaddedSongs} playlist={playlist} />
    </>
  )
}

export default PlaylistContent
