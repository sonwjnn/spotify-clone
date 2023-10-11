'use client'

import useOnPlay from '@/hooks/useOnPlay'
import usePlayer from '@/stores/usePlayer'
import { Playlist, Song } from '@/types/types'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import usePlayingSidebar from '@/stores/usePlayingSidebar'
import { useUser } from '@/hooks/useUser'
import PlayButton from '@/components/PlayButton'
import PlaylistLikeButton from '@/components/PlaylistLikeButton'
import MediaList from '@/components/MediaList'
import useSelectedPlayer from '@/stores/useSelectedPlayer'

interface SongPlaylistProps {
  songs: Song[]
  playlist: Playlist
}

const SongPlaylist: React.FC<SongPlaylistProps> = ({ songs, playlist }) => {
  const { user } = useUser()
  const onPlay = useOnPlay(songs)
  const {
    playlistPlayingId,
    isPlaying: isPlayerPlaying,
    setPlaylistActiveId,
    handlePlay,
  } = usePlayer()
  const { setShowed } = usePlayingSidebar()
  const { setSelected } = useSelectedPlayer()

  const [isPlaying, setPlaying] = useState(false)
  const params = useParams()

  useEffect(() => {
    if (playlistPlayingId?.toString() === params.id) {
      setPlaying(isPlayerPlaying)
    }
  }, [isPlayerPlaying, playlistPlayingId, params.id])

  const handleClickPlay = () => {
    if (playlistPlayingId?.toString() !== params.id && songs?.length) {
      setPlaylistActiveId(params.id as string)
      setShowed(true)
      onPlay(songs[0].id)
    } else {
      setSelected(true)
      handlePlay()
    }
  }

  useEffect(() => {
    console.log(playlist)
  }, [playlist])

  return (
    <>
      <div className="p-5 px-10 w-full flex gap-x-6 relative">
        <div
          style={{ backgroundColor: `${playlist.bg_color}` }}
          className="absolute h-[232px] top-0 left-0 right-0 header-bg-img-md z-0"
        ></div>
        <PlayButton
          className="opacity-1 translate-y-0 h-14 w-14"
          onClick={handleClickPlay}
          isPlaying={isPlaying}
        />
        {/* <MediaDropdown /> */}
        {user?.id !== playlist.user_id ? (
          <PlaylistLikeButton size={36} playlistId={playlist.id} />
        ) : null}
      </div>

      <MediaList songs={songs} playlist={playlist} type="playlist" />
    </>
  )
}

export default SongPlaylist
