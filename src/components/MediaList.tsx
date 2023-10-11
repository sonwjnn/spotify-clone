'use client'

import useOnPlay from '@/hooks/useOnPlay'
import useClickOutside from '@/hooks/useClickOutside'
import useMainLayout from '@/stores/useMainLayout'
import { useRef, useState } from 'react'
import MediaItem from '@/components/MediaItem'
import { ClockIcon } from '../../public/icons'

import { MediaListProps } from '@/types/track'
import usePlayer from '@/stores/usePlayer'
import cn from '@/utils/cn'

interface ListBarProps {
  className?: string
  type: 'default' | 'playlist' | 'album' | 'search' | 'artist' | 'queue'
}

const ListBar: React.FC<ListBarProps> = ({ className, type }) => {
  const { width } = useMainLayout()
  return (
    <div
      className={cn(
        `
        grid grid-cols-list-5 group gap-4
        w-full z-10  items-center px-4 h-9 border border-transparent border-b border-b-[hsla(0,0%,100%,0.1)] mb-2
        `,
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
        <div className="text-base text-neutral-400 text-right relative">#</div>
      )}
      <div className={`flex items-center gap-4 pr-2`}>
        <div
          className={`flex flex-col justify-between h-full gap-[5px] flex-1 overflow-hidden`}
        >
          <p className="text-sm text-neutral-400">Title</p>
        </div>
      </div>
      {type !== 'album' && type !== 'search' && (
        <>
          {width > 640 && (
            <p className="text-neutral-400 text-sm truncate">Album</p>
          )}
          {width > 780 && (
            <div className={'text-sm text-neutral-400'}>Date added</div>
          )}
        </>
      )}
      <div
        className={`flex text-neutral-400 gap-x-3 ${
          type === 'playlist'
            ? 'justify-center translate-x-2'
            : 'justify-end translate-x-[-5px]'
        } items-center `}
      >
        <ClockIcon />
      </div>
    </div>
  )
}

const MediaList: React.FC<MediaListProps> = ({
  songs,
  playlist,
  type = 'default',
}) => {
  const player = usePlayer()
  const onPlay = useOnPlay(songs)
  const [selectedId, setSelectedId] = useState<string>('')

  const wrapperRef = useRef(null)
  useClickOutside(wrapperRef, () => {
    setSelectedId('')
  })

  const handleOnPlay = (songId: string) => {
    onPlay(songId)
    if (type === 'playlist') {
      player.setPlaylistActiveId(playlist?.id)
    }
  }

  return (
    <>
      <div
        className="flex flex-col z-10  w-full px-6 pb-2 min-h-[20vh]"
        ref={wrapperRef}
      >
        {songs.length ? <ListBar type={type} /> : null}
        {songs.map((song, index) => (
          <div
            key={song.id}
            onClick={() => setSelectedId(song.id)}
            onDoubleClick={() => {
              handleOnPlay(song.id)
            }}
            className="flex items-center gap-x-4 w-full z-10"
          >
            <MediaItem
              type={type}
              song={song}
              playlist={playlist}
              index={type !== 'queue' ? index + 1 : index + 2}
              isSelected={selectedId === song.id}
              isActived={player.activeId === song.id}
            />
          </div>
        ))}
      </div>
    </>
  )
}

export default MediaList
