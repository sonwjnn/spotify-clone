'use client'

import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'

import { usePlaylistModal } from '@/hooks/modals/use-playlist-modal'
import { useLoadImage } from '@/hooks/use-load-image'
import { usePlayer } from '@/store/use-player'
import { MusicNote, SoundIconSolid } from '@/public/icons'
import type { Playlist } from '@/types/types'
import cn from '@/utils/cn'
import { buckets } from '@/utils/constants'

interface PlaylistItemProps {
  data: Playlist
  type?: 'myPlaylist' | 'otherPlaylist'
}

export const PlaylistItem: React.FC<PlaylistItemProps> = ({ data }) => {
  const uploadModal = usePlaylistModal()

  const router = useRouter()

  const { playlistPlayingId, isPlaying } = usePlayer()
  const imageUrl = useLoadImage(data.image_path, buckets.playlist_images)
  const { id } = useParams()

  const onClick = (): void => {
    uploadModal.setPlaylist(data)
    router.push(`/playlist/${data.id}`)
  }

  const fullName = data.users?.full_name
  const isActived = playlistPlayingId === data.id

  return (
    <div
      className={cn(
        ` flex w-full cursor-pointer items-center justify-between rounded-md p-2 transition  `,
        id === data.id.toString() &&
          'bg-neutral-800 hover:bg-neutral-700 active:bg-neutral-800/75',
        id !== data.id.toString() && 'hover:bg-neutral-800/50 active:bg-black'
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
