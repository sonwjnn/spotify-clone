'use client'

import { useUser } from '@/hooks/use-user'
import type { Playlist, Song } from '@/types/types'

import { SearchPlaylist } from './search-playlist'
import { SongPlaylist } from './song-playlist'

interface PlaylistContentProps {
  playlist: Playlist
  songs: Song[]
  addedSongs: Song[]
}

export const PlaylistContent: React.FC<PlaylistContentProps> = ({
  playlist,
  songs,
  addedSongs,
}) => {
  const { user } = useUser()
  const unaddedSongs = songs.filter(
    (song: Song) => !playlist?.song_ids?.includes(song.id)
  )

  return (
    <>
      <SongPlaylist songs={addedSongs} playlist={playlist} />
      {user?.id === playlist.user_id ? (
        <SearchPlaylist songs={unaddedSongs} playlist={playlist} />
      ) : null}
    </>
  )
}
