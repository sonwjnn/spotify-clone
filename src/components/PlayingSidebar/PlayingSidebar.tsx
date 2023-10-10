'use client'

import { CloseIcon, MusicNote } from '@/public/icons'
import NextSong from './NextSong'
import Box from '../Box'
import Image from 'next/image'
import LikeButton from '../LikeButton'

import useLoadImage from '@/hooks/useLoadImage'
import usePlayer from '@/stores/usePlayer'
import usePlayingSidebar from '@/stores/usePlayingSidebar'
import { useEffect, useRef, useState } from 'react'
import ScrollbarProvider from '@/providers/ScrollbarProvider'

const PlayingSidebar: React.FC = () => {
  const playingSidebar = usePlayingSidebar()
  const { currentTrack, queue, nextTrackIndex } = usePlayer()
  const imagePath = useLoadImage(currentTrack?.image_path!, 'images')

  // find next song
  const nextSong = { ...queue[nextTrackIndex] }

  const [isScroll, setScroll] = useState<boolean>(false)

  const scrollRef = useRef<any>()

  useEffect(() => {
    if (scrollRef.current) {
      const scrollElement = scrollRef.current.getScrollElement()

      const handleScroll = () => {
        const yAxis = scrollElement.scrollTop
        if (yAxis) {
          setScroll(true)
        } else {
          setScroll(false)
        }
      }

      scrollElement.addEventListener('scroll', handleScroll)

      return () => {
        scrollElement.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  return (
    <div className="hidden md:block max-w-[400px] min-w-[280px] relative   bg-black rounded-md py-2 pr-2  h-full ">
      <div className="h-full w-full bg-neutral-900 rounded-lg overflow-hidden">
        <Box className="h-full">
          <ScrollbarProvider scrollRef={scrollRef}>
            <div
              className={`min-h-8 p-4 pb-3  flex flex-row justify-end sticky top-0 bg-neutral-900 z-10 ${
                isScroll ? 'shadow-2xl' : ''
              }`}
            >
              <div
                className={
                  'w-8 h-8 rounded-full transition relative hover:bg-neutral-800'
                }
              >
                <button
                  className="absolute flex items-center justify-center top-[1px] right-0 border-none outline-none focus:outline-none cursor-pointer w-full h-full bg-transparent text-neutral-400 hover:text-white transition"
                  onClick={() => playingSidebar.setShowed(false)}
                >
                  <CloseIcon />
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-4 p-4 pt-0">
              {imagePath ? (
                <div className="relative aspect-square h-full w-full rounded-lg overflow-hidden shadow-base">
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
                    ' w-full aspect-square h-full text-white rounded-lg bg-[#282828] shadow-base flex items-center justify-center'
                  }
                >
                  <MusicNote size={114} />
                </div>
              )}
              <div
                className={
                  'flex flex-row items-center justify-between gap-6 w-full h-[64px] mt-2'
                }
              >
                <div className={'flex-1 flex flex-col overflow-hidden '}>
                  <h2
                    className={
                      'text-2xl text-white m-0 pb-2 font-bold hover:underline hover:decoration-2 truncate'
                    }
                  >
                    {currentTrack?.title}
                  </h2>
                  <span className={''}>
                    <p className="text-neutral-400 text-base pb-4 w-full truncate">
                      {currentTrack?.author}
                    </p>
                  </span>
                </div>
                <div
                  className={
                    'w-8 text-neutral-400 cursor-pointer hover:text-white'
                  }
                >
                  <LikeButton
                    className="flex"
                    songId={currentTrack?.id || ''}
                    size={24}
                  />
                </div>
              </div>

              <div
                className={
                  'flex flex-row gap-3 items-center rounded-lg overflow-hidden '
                }
              >
                <NextSong song={nextSong} />
              </div>
            </div>
          </ScrollbarProvider>
        </Box>
      </div>
    </div>
  )
}

export default PlayingSidebar
