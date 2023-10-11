'use client'

import { PlayIcon, SingleMusicNote } from '../../public/icons'
import { MediaItemProps } from '@/types/track'
import { getDurationSong } from '@/utils/durationConvertor'
import React, { memo, useState } from 'react'
import useMainLayout from '@/stores/useMainLayout'
import usePlayer from '@/stores/usePlayer'
import Image from 'next/image'
import useLoadImage from '@/hooks/useLoadImage'
import { buckets } from '@/utils/constants'
import dayjs from 'dayjs'
import LikeButton from './LikeButton'
import MediaDropdown from './MediaDropdown'
import cn from '@/utils/cn'

const MediaItem: React.FC<MediaItemProps> = ({
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
        <div className="text-base text-neutral-400 relative select-none">
          {index && player.isPlaying && handleActive() ? (
            <div className="relative h-full w-3  ml-2 overflow-hidden flex items-center ">
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
                text-sm flex items-center  justify-end w-4 
                ${handleActive() ? 'text-[#2ed760]' : 'text-neutral-400'}
              `}
            >
              {isHover ? <PlayIcon size={12} color={`#a3a3a3`} /> : index}
            </div>
          )}
        </div>
      )}
      <div className={`flex items-center gap-4 pr-2 min-w-0 select-none`}>
        {type !== 'album' && (
          <div
            className={`flex-shrink-0 w-10 h-10 aspect-square overflow-hidden relative`}
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
                className={`h-full w-full text-white items-center flex justify-center bg-neutral-800`}
              >
                <SingleMusicNote />
              </div>
            )}
          </div>
        )}
        <div
          className={`flex flex-col justify-between h-full gap-[5px] overflow-hidden`}
        >
          <p
            className={`
              ${handleActive() ? 'text-[#2ed760]' : 'text-white'}
              text-base p-0 m-0 truncate select-none`}
          >
            {song.title}
          </p>
          {type !== 'artist' && (
            <div className={`flex items-center gap-[3px] w-full truncate`}>
              {/* <SubTitle data={artists} /> */}
              <p className="text-neutral-400 text-sm truncate select-none">
                {song.author}
              </p>
            </div>
          )}
        </div>
      </div>
      {type !== 'album' && type !== 'search' && (
        <>
          {width > 640 && (
            <p className="text-neutral-400 text-sm truncate select-none">
              {song.title}
            </p>
          )}
          {width > 780 && (
            <div className={'text-sm text-neutral-400 select-none'}>
              {dayjs(song.created_at).format('DD-MM-YYYY')}
            </div>
          )}
        </>
      )}
      <div className={`group flex gap-x-3 justify-end items-center`}>
        <LikeButton
          isSelected={isSelected}
          song={song}
          songId={song.id}
          size={20}
        />

        <div className={'text-sm text-neutral-400 select-none'}>
          {getDurationSong({
            milliseconds: song?.duration_ms ? song?.duration_ms : 0,
          })}
        </div>

        {playlist?.id && width > 480 ? (
          <MediaDropdown
            className={`${isHover ? 'opacity-100' : 'opacity-0'}`}
            songId={song.id}
            playlistId={playlist.id}
          />
        ) : null}
      </div>
    </div>
  )
}

export default memo(MediaItem)
