'use client'

import { useRef, useState } from 'react'

import { MediaItem } from '@/components/media-item'
import { useOnClickOutside } from '@/hooks/use-click-outside'
import { useMainLayout } from '@/store/use-main-layout'
import { useOnPlay } from '@/hooks/use-on-play'
import { usePlayer } from '@/store/use-player'
import { usePlaylist } from '@/store/use-playlist'
import { ClockIcon } from '@/public/icons'
import type { MediaListProps } from '@/types/track'
import type { Playlist } from '@/types/types'
import { cn } from '@/lib/utils'

type ListBarProps = {
  className?: string
  type: 'default' | 'playlist' | 'album' | 'search' | 'artist' | 'queue'
  hasAddTrackBtn?: boolean
}

const ListBar = ({ className, type, hasAddTrackBtn = false }: ListBarProps) => {
  const { width } = useMainLayout()
  return (
    <div
      className={cn(
        `group z-10 mb-2 grid h-9 w-full grid-cols-list-5 items-center gap-4 border border-b border-transparent
        border-b-[hsla(0,0%,100%,0.1)] px-4`,
        className,
        {
          'grid-cols-list-4': width <= 780 && type !== 'album',
          '!grid-cols-list-3': width <= 640 && type !== 'album',
          '!grid-cols-list-2': width <= 480 && type !== 'album',
          '!grid-cols-album-3': type === 'album',
          '!grid-cols-search-2': type === 'search',
        }
      )}
    >
      {type !== 'search' && width > 480 && (
        <div className="relative text-right text-base text-zinc-700 dark:text-neutral-400 ">
          #
        </div>
      )}
      <div className={`flex items-center gap-4 pr-2`}>
        <div
          className={`flex h-full flex-1 flex-col justify-between gap-[5px] overflow-hidden`}
        >
          <p className="text-sm text-zinc-700 dark:text-neutral-400">Title</p>
        </div>
      </div>
      {type !== 'album' && type !== 'search' && (
        <>
          {width > 640 && (
            <p className="truncate text-sm text-zinc-700 dark:text-neutral-400">
              Album
            </p>
          )}
          {width > 780 && (
            <div className={'text-sm text-zinc-700 dark:text-neutral-400'}>
              Date added
            </div>
          )}
        </>
      )}
      <div
        className={`flex gap-x-3 text-zinc-700 dark:text-neutral-400 ${
          type === 'playlist'
            ? 'translate-x-2 justify-center'
            : 'translate-x-[-5px] justify-end'
        } items-center `}
      >
        {hasAddTrackBtn ? 'Action' : <ClockIcon />}
      </div>
    </div>
  )
}

export const MediaList = ({
  songs,
  type = 'default',
  hasAddTrackBtn = false,
}: MediaListProps) => {
  const player = usePlayer()
  const { playlist } = usePlaylist()
  const onPlay = useOnPlay(songs)
  const [selectedId, setSelectedId] = useState<string>('')

  const wrapperRef = useRef(null)
  useOnClickOutside(wrapperRef, () => {
    setSelectedId('')
  })

  const handleOnPlay = (songId: string): void => {
    onPlay(songId)
    if (type === 'playlist') {
      player.setPlaylistActiveId(playlist?.id)
    }
  }

  return (
    <>
      <div
        className=" z-10  flex min-h-[20vh] w-full flex-col px-6 pb-2"
        ref={wrapperRef}
      >
        {songs.length ? (
          <ListBar type={type} hasAddTrackBtn={hasAddTrackBtn} />
        ) : null}
        {songs.map((song, index) => (
          <div
            key={song.id}
            onClick={() => setSelectedId(song.id)}
            onDoubleClick={() => {
              handleOnPlay(song.id)
            }}
            className="z-10 flex w-full items-center gap-x-4"
          >
            <MediaItem
              type={type}
              song={song}
              playlist={playlist as Playlist}
              index={type !== 'queue' ? index + 1 : index + 2}
              isSelected={selectedId === song.id}
              isActived={player.activeId === song.id}
              hasAddTrackBtn={hasAddTrackBtn}
            />
          </div>
        ))}
      </div>
    </>
  )
}
