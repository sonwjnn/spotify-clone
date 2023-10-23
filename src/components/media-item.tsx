'use client'

import dayjs from 'dayjs'
import Image from 'next/image'
import React, { useState } from 'react'

import { useLoadImage } from '@/hooks/use-load-image'
import { PlayIcon, SingleMusicNote } from '@/public/icons'
import { useMainLayout } from '@/stores/use-main-layout'
import { usePlayer } from '@/stores/use-player'
import type { MediaItemProps } from '@/types/track'
import cn from '@/utils/cn'
import { buckets } from '@/utils/constants'
import { getDurationSong } from '@/utils/duration-convertor'

import { LikeButton } from './like-button'
import { MediaDropdown } from './media-dropdown'

export const MediaItem: React.FC<MediaItemProps> = ({
  type = 'default',
  index,
  song,
  playlist,
  isSelected,
  isActived,
}) => {
  const { width } = useMainLayout()
  const imageUrl = useLoadImage(song.image_path, buckets.images)
  const player = usePlayer()

  const [isHover, setHover] = useState<boolean>(false)

  const handleActive = (): boolean | undefined => {
    if (type === 'playlist') {
      const isPlaylistPlaying = playlist?.id === player.playlistPlayingId

      return isPlaylistPlaying && isActived
    }
    return isActived
  }

  return (
    <div
      className={cn(
        `
      grid grid-cols-list-5 group gap-4
      ${isSelected && 'bg-neutral-800/50'}
      transition cursor-pointer rounded-md px-4 h-[56px] w-full hover:bg-white hover:bg-opacity-10 items-center
    `,
        {
          'grid-cols-list-4': width <= 780 && type !== 'album',
          '!grid-cols-list-3': width <= 640 && type !== 'album',
          '!grid-cols-list-2 ': width <= 480 && type !== 'album',
          '!grid-cols-album-3': type === 'album',
          '!grid-cols-search-2': type === 'search',
        }
      )}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {type !== 'search' && width > 480 && (
        <div className="relative select-none text-base text-neutral-400">
          {index && player.isPlaying && handleActive() ? (
            <div className="relative ml-2 flex  h-full w-3 items-center overflow-hidden ">
              <Image
                src={'/images/animation/equaliser-animated-green.f5eb96f2.gif'}
                sizes={'100%'}
                height={20}
                width={20}
                alt="equaliser"
              />
            </div>
          ) : (
            <div
              className={`
                flex w-4 items-center  justify-end text-sm 
                ${handleActive() ? 'text-[#2ed760]' : 'text-neutral-400'}
              `}
            >
              {isHover ? <PlayIcon size={12} color={`#a3a3a3`} /> : index}
            </div>
          )}
        </div>
      )}
      <div className={`flex min-w-0 select-none items-center gap-4 pr-2`}>
        {type !== 'album' && (
          <div
            className={`relative aspect-square h-10 w-10 shrink-0 overflow-hidden`}
          >
            {imageUrl ? (
              <Image
                fill
                src={imageUrl}
                sizes="100%"
                alt="Media-Item"
                className="object-cover"
              />
            ) : (
              <div
                className={`flex h-full w-full items-center justify-center bg-neutral-800 text-white`}
              >
                <SingleMusicNote />
              </div>
            )}
          </div>
        )}
        <div
          className={`flex h-full flex-col justify-between gap-[5px] overflow-hidden`}
        >
          <p
            className={`
              ${handleActive() ? 'text-[#2ed760]' : 'text-white'}
              m-0 select-none truncate p-0 text-base`}
          >
            {song.title}
          </p>
          {type !== 'artist' && (
            <div className={`flex w-full items-center gap-[3px] truncate`}>
              {/* <SubTitle data={artists} /> */}
              <p className="select-none truncate text-sm text-neutral-400">
                {song.author}
              </p>
            </div>
          )}
        </div>
      </div>
      {type !== 'album' && type !== 'search' && (
        <>
          {width > 640 && (
            <p className="select-none truncate text-sm text-neutral-400">
              {song.title}
            </p>
          )}
          {width > 780 && (
            <div className={'select-none text-sm text-neutral-400'}>
              {dayjs(song.created_at).format('DD-MM-YYYY')}
            </div>
          )}
        </>
      )}
      <div className={`group flex items-center justify-end gap-x-3`}>
        <LikeButton
          isSelected={isSelected}
          song={song}
          songId={song.id}
          size={20}
        />

        <div className={'select-none text-sm text-neutral-400'}>
          {getDurationSong({
            milliseconds: song?.duration_ms ? song?.duration_ms : 0,
          })}
        </div>

        {playlist?.id && width > 480 ? (
          <MediaDropdown
            className={`${isHover ? 'opacity-100' : 'opacity-0'}`}
            songId={song.id}
            playlist={playlist}
          />
        ) : null}
      </div>
    </div>
  )
}
