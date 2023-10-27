'use client'

import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { twMerge } from 'tailwind-merge'

import { usePlaylistModal } from '@/hooks/modals/use-playlist-modal'
// import { useGetUserById } from '@/hooks/use-get-user-by-id.'
import { useLoadImage } from '@/hooks/use-load-image'
import { usePlayer } from '@/hooks/use-player'
import { MusicNote, SoundIconSolid } from '@/public/icons'
import type { Playlist } from '@/types/types'
import { buckets } from '@/utils/constants'

interface PlaylistItemProps {
  data: Playlist
  index?: number
  className?: string
  type?: 'myPlaylist' | 'otherPlaylist'
}

export const PlaylistItem: React.FC<PlaylistItemProps> = ({
  data,
  className,
  // type = 'myPlaylist',
}) => {
  const { playlistPlayingId, isPlaying } = usePlayer()
  const router = useRouter()
  const imageUrl = useLoadImage(data.image_path, buckets.playlist_images)
  const uploadModal = usePlaylistModal()
  const { id } = useParams()

  const onClick = (): void => {
    uploadModal.setPlaylist(data)
    router.push(`/playlist/${data.id}`)
  }

  // const fullName = (): string => {
  //   let name
  //   if (type === 'otherPlaylist') {
  //     name = user.user?.full_name
  //   } else if (type === 'myPlaylist') {
  //     name = data.users?.full_name
  //   }
  //   return name || 'No name'
  // }
  const fullName = data.users?.full_name
  const isActived = playlistPlayingId === data.id
  return (
    <div
      className={twMerge(
        ` cursor-pointer rounded-md p-2 flex justify-between items-center transition w-full hover:bg-neutral-800/50 ${
          id === data.id.toString() && 'bg-neutral-800/50'
        }`,
        className
      )}
      onClick={onClick}
    >
      <div className="flex min-w-0 items-center gap-x-3">
        <div className="relative min-h-[48px] min-w-[48px] overflow-hidden rounded-md">
          {imageUrl ? (
            <Image
              fill
              src={imageUrl}
              sizes="100%"
              alt="Media-Item"
              className="object-cover"
              blurDataURL={imageUrl}
              placeholder="blur"
            />
          ) : (
            <div className="flex min-h-[48px] w-full items-center justify-center bg-neutral-800 text-white">
              <MusicNote size={20} />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-y-1 overflow-hidden ">
          <p
            className={` truncate  ${
              isActived ? 'text-[#2ed760]' : 'text-white'
            }`}
          >
            {data.title}
          </p>
          <p className="truncate text-sm text-neutral-400">
            {`Playlist - ${fullName}`}
          </p>
        </div>
      </div>
      {isActived && isPlaying ? (
        <div className="pr-2">
          <SoundIconSolid color="#2ed760" />
        </div>
      ) : null}
    </div>
  )
}
