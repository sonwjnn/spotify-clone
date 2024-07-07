'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { LikePlaylistButton } from './like-playlist-button'
import { MediaList } from '@/components/media-list'
import { PlayButton } from '@/components/play-button'
import { useOnPlay } from '@/hooks/use-on-play'
import { usePlayer } from '@/store/use-player'
import { usePlayingView } from '@/store/use-playing-view'
import { usePlaylist } from '@/store/use-playlist'
import { useSelectedPlayer } from '@/store/use-selected-player'
import { useUser } from '@/hooks/use-user'
import type { Playlist } from '@/types/types'

import { PlaylistDropdown } from './playlist-dropdown'

export const SongPlaylist = () => {
  const { playlistSongs: songs } = usePlaylist()
  const { user } = useUser()
  const { playlist } = usePlaylist()
  const onPlay = useOnPlay(songs)
  const {
    playlistPlayingId,
    isPlaying: isPlayerPlaying,
    setPlaylistActiveId,
    handlePlay,
  } = usePlayer()
  const { resetMaxWidth } = usePlayingView()
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
      resetMaxWidth()
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
          style={{ backgroundColor: `${playlist?.bg_color}` }}
          className="header-bg-img-md-light dark:header-bg-img-md absolute inset-x-0 top-0 z-0 h-[232px]"
        ></div>
        <PlayButton
          className="h-14 w-14 translate-y-0 opacity-100"
          onClick={handleClickPlay}
          isPlaying={isPlaying}
        />
        {/* <MediaDropdown /> */}
        {user?.id !== playlist?.user_id ? (
          <div className="z-10 flex h-14 w-14 items-center justify-center">
            <LikePlaylistButton size={36} />
          </div>
        ) : null}
        <PlaylistDropdown data={playlist as Playlist} />
      </div>

      <MediaList songs={songs} type="playlist" />
    </>
  )
}
