'use client'

import { useUser } from '@/hooks/useUser'
import useUserStore from '@/stores/useUserStore'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Button from '@/components/ui/Button'
import { SingleMusicNote } from '../../../../public/icons'
import MediaList from '@/components/MediaList'
import PlayButton from '@/components/PlayButton'
import useOnPlay from '@/hooks/useOnPlay'
import usePlayer from '@/stores/usePlayer'
import usePlayingSidebar from '@/stores/usePlayingSidebar'

interface LikedContentProp {
  bgColor?: string
}

const LikedContent: React.FC<LikedContentProp> = ({ bgColor }) => {
  const router = useRouter()
  const { likedSongs: songs } = useUserStore()
  const { isLoading, user } = useUser()
  const onPlay = useOnPlay(songs)
  const player = usePlayer()
  const { setShowed } = usePlayingSidebar()
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

  if (songs.length === 0) {
    return (
      <div
        className=" h-[40vh] pt-8 px-5 flex flex-col header-bg-img-md items-center justify-center gap-y-4 w-full text-white"
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
          className="bg-white px-6 py-2 w-[150px]"
        >
          Find songs
        </Button>
      </div>
    )
  }

  const handleClickPlay = () => {
    if (player.playlistPlayingId !== params && songs?.length) {
      player.setPlaylistActiveId('liked')
      onPlay(songs[0].id)
      setShowed(true)
    } else {
      player.handlePlay()
    }
  }

  return (
    <>
      <div className="p-5 px-10 w-full flex gap-x-6 relative">
        <div
          style={{ backgroundColor: `${bgColor}` }}
          className="absolute h-[232px] top-0 left-0 right-0 header-bg-img-md z-[-1]"
        ></div>
        <PlayButton
          className="opacity-1 translate-y-0 h-14 w-14"
          onClick={handleClickPlay}
          isPlaying={isPlaying}
        />
        {/* <MediaDropdown /> */}
      </div>
      <MediaList songs={songs} />
    </>
  )
}

export default LikedContent
