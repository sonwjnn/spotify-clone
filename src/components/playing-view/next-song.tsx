'use client'

import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import type { FC } from 'react'
import { useState } from 'react'
import Skeleton from 'react-loading-skeleton'

import useLoadImage from '@/hooks/use-load-image'
import { MusicNote, PlayIcon, SingleMusicNote } from '@/public/icons'
import usePlayer from '@/stores/use-player'
import type { Song } from '@/types/types'

interface NextSongProps {
  song: Song | undefined
}
const NextSong: FC<NextSongProps> = ({ song }) => {
  const player = usePlayer()
  const imagePath = useLoadImage(song?.image_path!, 'images')
  const router = useRouter()
  const pathname = usePathname()

  const [isHover, setHover] = useState<boolean>(false)

  const handleOnNextSong = (): void => {
    if (song) {
      player.setId(song?.id)
    }
  }

  const handleClickQueueBtn = (): void => {
    if (pathname !== '/queue') {
      router.push('/queue')
    } else {
      router.back()
    }
  }

  return (
    <div
      className={'flex w-full flex-col rounded-2xl bg-neutral-400/5 p-4 pb-2 '}
    >
      <div className={'flex flex-row justify-between '}>
        <span className={'truncate text-base font-bold text-white'}>
          Next in queue
        </span>

        <div className="scale-[1.04] underline hover:text-white ">
          <button
            onClick={handleClickQueueBtn}
            className="origin-center cursor-pointer border-none bg-transparent text-sm font-bold text-neutral-400 outline-none transition hover:underline focus:outline-none"
          >
            Open queue
          </button>
        </div>
      </div>
      <div className={'mt-4 '}>
        <div
          onDoubleClick={handleOnNextSong}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className={
            'flex h-[64px] cursor-pointer flex-row items-center gap-3 overflow-hidden rounded-lg  p-2 transition hover:bg-neutral-400/10'
          }
        >
          <div className={'w-4 text-white'}>
            {isHover ? (
              <PlayIcon color="#ffffff" size={14} />
            ) : (
              <SingleMusicNote size={16} />
            )}
          </div>
          <div className={' h-12 w-12'}>
            {imagePath ? (
              <div className="relative aspect-square h-full w-full overflow-hidden rounded-md">
                <Image
                  className="
            object-cover
          "
                  src={imagePath}
                  fill
                  alt="Img"
                  sizes="100%"
                  blurDataURL={imagePath}
                  placeholder="blur"
                />
              </div>
            ) : (
              <div
                className={
                  'flex h-full w-full items-center justify-center rounded-lg bg-[#282828] text-white'
                }
              >
                <MusicNote size={20} />
              </div>
            )}
          </div>
          <div
            className={
              'flex min-w-0 flex-1 select-none flex-col overflow-hidden'
            }
          >
            {song?.title ? (
              <span
                className={
                  'cursor-pointer truncate text-base font-bold text-white hover:underline '
                }
              >
                {song?.title}
              </span>
            ) : (
              <Skeleton height={'100%'} borderRadius={50} />
            )}
            {song?.author ? (
              <span className={'select-none truncate text-sm text-neutral-400'}>
                {song?.author}
              </span>
            ) : (
              <Skeleton height={'100%'} width={'40%'} borderRadius={50} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NextSong
