'use client'

import Image from 'next/image'
import { useState } from 'react'

import useLoadImage from '@/hooks/useLoadImage'
import { CloseIcon, MusicNote } from '@/public/icons'
import usePlayer from '@/stores/usePlayer'
import usePlayingSidebar from '@/stores/usePlayingSidebar'
import type { Song } from '@/types/types'

import LikeButton from '../LikeButton'
import { ResizePlaying } from '../ResizePlaying'
import { ScrollArea } from '../ui/scroll-area'
import NextSong from './NextSong'

const PlayingSidebar: React.FC = () => {
  const playingSidebar = usePlayingSidebar()
  const { currentTrack, queue, nextTrackIndex } = usePlayer()
  const imagePath = useLoadImage(currentTrack?.image_path!, 'images')

  // find next song
  const nextSong = { ...queue[nextTrackIndex] } as Song

  const [isScroll, setScroll] = useState<boolean>(false)

  if (!currentTrack) {
    return null
  }

  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>): void => {
    const yAxis = e.currentTarget.scrollTop
    if (yAxis) {
      setScroll(true)
    } else {
      setScroll(false)
    }
  }

  return (
    <ResizePlaying
      className="hidden md:block"
      type="playing"
      minWidth={300}
      maxWidth={400}
    >
      <div className="h-full  bg-black p-2 ">
        <ScrollArea
          className="relative h-full w-full rounded-lg bg-neutral-900"
          onScroll={handleScroll}
        >
          <div
            className={` sticky top-0  z-10 flex flex-row justify-end bg-neutral-900 p-4 pb-3 ${
              isScroll ? 'shadow-2xl' : ''
            }`}
          >
            <div
              className={
                'relative h-8 w-8 rounded-full transition hover:bg-neutral-800'
              }
            >
              <button
                className="absolute right-0 top-[1px] flex h-full w-full cursor-pointer items-center justify-center border-none bg-transparent text-neutral-400 outline-none transition hover:text-white focus:outline-none"
                onClick={() => playingSidebar.setShowed(false)}
              >
                <CloseIcon />
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-4 p-4 pt-0">
            {imagePath ? (
              <div className="relative aspect-square h-full w-full overflow-hidden rounded-lg shadow-base">
                <Image
                  className="object-cover"
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
                  ' flex aspect-square h-full w-full items-center justify-center rounded-lg bg-[#282828] text-white shadow-base'
                }
              >
                <MusicNote size={114} />
              </div>
            )}
            <div
              className={
                'mt-2 flex h-[64px] w-full flex-row items-center justify-between gap-6'
              }
            >
              <div className={'flex flex-1 flex-col overflow-hidden '}>
                <h2
                  className={
                    'm-0 truncate pb-2 text-2xl font-bold text-white hover:underline hover:decoration-2'
                  }
                >
                  {currentTrack?.title}
                </h2>
                <span className={''}>
                  <p className="w-full truncate pb-4 text-base text-neutral-400">
                    {currentTrack?.author}
                  </p>
                </span>
              </div>
              <div
                className={
                  'w-8 cursor-pointer text-neutral-400 hover:text-white'
                }
              >
                <LikeButton
                  className="flex"
                  song={currentTrack}
                  songId={currentTrack?.id || ''}
                  size={24}
                />
              </div>
            </div>

            <div
              className={
                'flex flex-row items-center gap-3 overflow-hidden rounded-lg '
              }
            >
              <NextSong song={nextSong} />
            </div>
          </div>
        </ScrollArea>
      </div>
    </ResizePlaying>
  )
}

export default PlayingSidebar
