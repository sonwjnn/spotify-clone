'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { MediaList } from '@/components/media-list'
import { PlayButton } from '@/components/play-button'
import { Button } from '@/components/ui/button'
import { useOnPlay } from '@/hooks/use-on-play'
import { usePlayer } from '@/hooks/use-player'
import { usePlayingView } from '@/hooks/use-playing-view'
import { useUser } from '@/hooks/use-user'
import { useUserStore } from '@/hooks/use-user-store'
import { SingleMusicNote } from '@/public/icons'

interface LikedContentProp {
  bgColor?: string
}

export const LikedContent: React.FC<LikedContentProp> = ({ bgColor }) => {
  const router = useRouter()
  const { likedSongs: songs } = useUserStore()
  const { isLoading, user } = useUser()
  const onPlay = useOnPlay(songs)
  const player = usePlayer()
  const { resetMaxWidth } = usePlayingView()
  const [isPlaying, setPlaying] = useState(false)
  const params = 'liked'

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/')
    }
  }, [isLoading, user, router])

  useEffect(() => {
    if (player.playlistPlayingId === 'liked') {
      setPlaying(player.isPlaying)
    }
  }, [player.isPlaying, player.playlistPlayingId])

  if (!songs.length) {
    return (
      <div
        className=" header-bg-img-md flex h-[40vh] w-full flex-col items-center justify-center gap-y-4 px-5 pt-8 text-white"
        style={{
          background: bgColor,
        }}
      >
        <div>
          <SingleMusicNote size={70} />
        </div>
        <h1 className="text-[32px] font-bold">
          Songs you like will appear here
        </h1>
        <p className="text-base font-semibold">
          Save songs by tapping the heart icon.
        </p>
        <Button
          onClick={() => router.push('/search')}
          className="w-[150px] bg-white px-6 py-2"
        >
          Find songs
        </Button>
      </div>
    )
  }

  const handleClickPlay = (): void => {
    if (player.playlistPlayingId !== params && songs?.length) {
      player.setPlaylistActiveId('liked')
      if (songs[0]) {
        onPlay(songs[0].id)
        resetMaxWidth()
      }
    } else {
      player.handlePlay()
    }
  }

  return (
    <>
      <div className="relative flex w-full gap-x-6 p-5 px-10">
        <div
          style={{ backgroundColor: `${bgColor}` }}
          className="header-bg-img-md absolute inset-x-0 top-0 z-0 h-[232px]"
        ></div>
        <PlayButton
          className="h-14 w-14 translate-y-0 opacity-100"
          onClick={handleClickPlay}
          isPlaying={isPlaying}
        />
        {/* <MediaDropdown /> */}
      </div>
      <MediaList songs={songs} />
    </>
  )
}
