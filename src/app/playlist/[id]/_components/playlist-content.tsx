'use client'

import type { Playlist, Song } from '@/types/types'

import SearchPlaylist from './search-playlist'
import SongPlaylist from './song-playlist'

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
  const unaddedSongs = songs.filter(
    (song: Song) => !playlist?.song_ids?.includes(song.id)
  )

  return (
    <>
      <SongPlaylist songs={addedSongs} playlist={playlist} />
      <SearchPlaylist songs={unaddedSongs} playlist={playlist} />
    </>
  )
}

export default PlaylistContent
