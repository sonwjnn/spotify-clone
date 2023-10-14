'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import MediaList from '@/components/MediaList'
import PlayButton from '@/components/PlayButton'
import PlaylistLikeButton from '@/components/PlaylistLikeButton'
import useOnPlay from '@/hooks/useOnPlay'
import { useUser } from '@/hooks/useUser'
import usePlayer from '@/stores/usePlayer'
import usePlayingSidebar from '@/stores/usePlayingSidebar'
import useSelectedPlayer from '@/stores/useSelectedPlayer'
import type { Playlist, Song } from '@/types/types'

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
  const { isShowed, handleCollapsed } = usePlayingSidebar()
  const { setSelected } = useSelectedPlayer()

  const [isPlaying, setPlaying] = useState(false)
  const params = useParams()

  useEffect(() => {
    if (playlistPlayingId?.toString() === params.id) {
      setPlaying(isPlayerPlaying)
    }
  }, [isPlayerPlaying, playlistPlayingId, params.id])

  const handleClickPlay = (): void => {
    if (playlistPlayingId?.toString() !== params.id && songs?.length !== 0) {
      setPlaylistActiveId(params.id as string)
      if (!isShowed) handleCollapsed()
      onPlay(songs[0]?.id!)
    } else {
      setSelected(true)
      handlePlay()
    }
  }

  return (
    <>
      <div className="relative flex w-full gap-x-6 p-5 px-10">
        <div
          style={{ backgroundColor: `${playlist.bg_color}` }}
          className="header-bg-img-md absolute inset-x-0 top-0 z-0 h-[232px]"
        ></div>
        <PlayButton
          className="h-14 w-14 translate-y-0 opacity-100"
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
