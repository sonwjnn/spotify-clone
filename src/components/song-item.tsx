'use client'

import Image from 'next/image'

import useLoadImage from '@/hooks/use-load-image'
import { MusicNote } from '@/public/icons'
import usePlayer from '@/stores/use-player'
import type { Song } from '@/types/types'

import PlayButton from './play-button'

interface SongItemProps {
  data: Song
  onClick: (id: string) => void
}

const SongItem: React.FC<SongItemProps> = ({ data, onClick }) => {
  const { currentTrack, isPlaying, handlePlay } = usePlayer()

  const isPlayingCurrentTrack = currentTrack?.id === data.id && isPlaying
  const imagePath = useLoadImage(data.image_path, 'images')
  return (
    <div
      onClick={() => onClick(data.id)}
      className="group relative mb-3 flex cursor-pointer flex-col items-center justify-center gap-x-4 overflow-hidden rounded-md bg-neutral-400/5 p-4 transition hover:bg-neutral-400/10"
    >
      <div className="relative aspect-square h-full w-full overflow-hidden rounded-md shadow-base">
        {imagePath ? (
          <Image
            className="object-cover"
            src={imagePath}
            fill
            alt="song img"
            sizes="100%"
            priority={true}
            blurDataURL={imagePath}
            placeholder="blur"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-neutral-800 text-white">
            <MusicNote size={50} />
          </div>
        )}
      </div>

      <div className="flex w-full flex-col items-start gap-y-1 pt-4">
        <p className="w-full truncate font-semibold text-white">{data.title}</p>
        <p className="w-full truncate pb-4 text-sm text-neutral-400">
          By {data.author}
        </p>
      </div>
      <div className="absolute bottom-[102px] right-6">
        <PlayButton onClick={handlePlay} isPlaying={isPlayingCurrentTrack} />
      </div>
    </div>
  )
}

export default SongItem
