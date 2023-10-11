'use client'

import useLoadImage from '@/hooks/useLoadImage'
import usePlaylistModal from '@/hooks/usePlaylistModal'
import { MusicNote, SoundIconSolid } from '/public/icons'
import usePlayer from '@/stores/usePlayer'
import { Playlist } from '@/types/types'
import { buckets } from '@/utils/constants'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { twMerge } from 'tailwind-merge'

interface PlaylistItemProps {
  data: Playlist
  index?: number
  className?: string
}

const PlaylistItem: React.FC<PlaylistItemProps> = ({ data, className }) => {
  const { playlistPlayingId, isPlaying } = usePlayer()
  const router = useRouter()
  const imageUrl = useLoadImage(data.image_path, buckets.playlist_images)
  const uploadModal = usePlaylistModal()
  const { id } = useParams()

  const onClick = () => {
    uploadModal.setPlaylist(data)
    router.push(`/playlist/${data.id}`)
  }

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
      <div className="flex item-center gap-x-3 min-w-0">
        <div className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden">
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
            <div className="w-full text-white h-full flex items-center justify-center bg-neutral-800">
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
          <p className="text-neutral-400 text-sm truncate">
            {`Playlist - ${data?.users?.full_name}`}
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

export default PlaylistItem
