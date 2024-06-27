'use client'

import { useEffect } from 'react'

import { usePlaylist } from '@/store/use-playlist'
import { useUser } from '@/hooks/use-user'
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

  const { setPlaylist, setPlaylistSongs } = usePlaylist()

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
