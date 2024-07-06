'use client'

import Image from 'next/image'

import { useLoadImage } from '@/hooks/use-load-image'
import { MusicNote } from '@/public/icons'
import type { Song } from '@/types/types'
import { buckets } from '@/utils/constants'

import { LikeButton } from '@/components/like-button'

interface SongDetailsProps {
  data: Song
}

export const SongDetails: React.FC<SongDetailsProps> = ({ data }) => {
  const imageUrl = useLoadImage(data.image_path, buckets.images)

  return (
    <div className="flex w-full items-center gap-x-4   md:pr-6">
      <div
        className={`min-w-[200px] gap-x-2  rounded-md transition md:min-w-0`}
      >
        <div
          className="flex items-center gap-x-3
      "
        >
          <div className="relative min-h-[56px] min-w-[56px] overflow-hidden rounded-md">
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
              <div className="flex aspect-square h-full w-full items-center justify-center bg-zinc-300 text-white dark:bg-neutral-800">
                <MusicNote size={22} />
              </div>
            )}
          </div>
          <div className="flex flex-col gap-y-1 overflow-hidden">
            <p className="truncate text-sm text-zinc-600 dark:text-white">
              {data.title}
            </p>
            <p className="truncate text-xs text-zinc-500 dark:text-neutral-400">
              {data.author}
            </p>
          </div>
        </div>
      </div>
      <LikeButton className="flex" song={data} size={22} />
    </div>
  )
}
