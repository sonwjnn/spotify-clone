'use client'
import useLoadImage from '@/hooks/useLoadImage'
import { Song } from '@/types'
import Image from 'next/image'
import React from 'react'
interface SongItemProps {
  data: Song
  onClick: (id: string) => void
}

const SongItem: React.FC<SongItemProps> = ({ data, onClick }) => {
  const imagePath = useLoadImage(data)
  return (
    <div
      className="relative flex flex-col group items-center justify-center rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10 transition p-3"
      onClick={() => onClick(data.id)}
    >
      <div className="relative aspect-square h-full w-full rounded-md overflow-hidden">
        <Image
          className="
            object-cover
          "
          src={imagePath || '/image/liked.png'}
          fill
          alt="Img"
        />
      </div>

      <div className="flex flex-col items-start w-full pt-4 gap-y-1">
        <p className="truncate font-semibold w-full">{data.title}</p>
        <p className="text-neutral-400 text-sm pb-4 w-full truncate">
          By {data.author}
        </p>
      </div>
      <div className="absolute bottom-24 right-5">Play Button</div>
    </div>
  )
}

export default SongItem
