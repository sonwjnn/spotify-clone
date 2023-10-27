'use client'

import { useEffect } from 'react'

import { useUser } from '@/hooks/use-user'
import { usePlaylistStore } from '@/stores/use-playlist-store'
import type { Playlist, Song } from '@/types/types'

import { SearchPlaylist } from './search-playlist'
import { SongPlaylist } from './song-playlist'

interface PlaylistContentProps {
  playlist: Playlist
  playlistSongs: Song[]
}

export const PlaylistContent: React.FC<PlaylistContentProps> = ({
  playlist,
  playlistSongs,
}) => {
  const { user } = useUser()

  const { setPlaylist, setPlaylistSongs } = usePlaylistStore()

  useEffect(() => {
    setPlaylist(playlist)
  }, [playlist])

  useEffect(() => {
    setPlaylistSongs(playlistSongs)
  }, [playlistSongs])

  return (
    <>
      <SongPlaylist />
      {user?.id === playlist.user_id ? <SearchPlaylist /> : null}
    </>
  )
}
