import Image from 'next/image'
import Link from 'next/link'

import { useLoadImage } from '@/hooks/use-load-image'
import { MusicNote } from '@/public/icons'
import type { Playlist } from '@/types/types'
import { buckets } from '@/utils/constants'

type CollapseListProps = {
  playlists: Playlist[]
}

type CollapseListItemProps = {
  playlist: Playlist
}

const CollapseListItem = ({ playlist }: CollapseListItemProps) => {
  const imageUrl = useLoadImage(playlist.image_path, buckets.playlist_images)
  return (
    <div className="flex items-center justify-center  rounded-lg  py-2  transition hover:bg-neutral-800 ">
      {imageUrl ? (
        <div className="relative aspect-square h-12 w-12 overflow-hidden rounded-sm shadow-base">
          <Image
            fill
            src={imageUrl}
            sizes="100%"
            alt="Media-Item"
            className="object-cover"
            blurDataURL={imageUrl}
            placeholder="blur"
          />
        </div>
      ) : (
        <div className="flex h-14 w-14 items-center justify-center bg-zinc-300 text-white dark:bg-neutral-800">
          <MusicNote size={20} />
        </div>
      )}
    </div>
  )
}

export const CollapseList = ({ playlists }: CollapseListProps) => {
  return (
    <div className="flex h-full w-full flex-col ">
      {playlists.map(playlist => (
        <Link
          href={`/playlist/${playlist.id}`}
          key={playlist.id}
          className="px-1"
        >
          <CollapseListItem playlist={playlist} />
        </Link>
      ))}

      <Link href={`/liked`} className="  px-1 ">
        <div className="flex items-center justify-center rounded-lg py-2 shadow-base transition hover:bg-neutral-800 ">
          <div className="relative aspect-square h-12 w-12 overflow-hidden rounded-sm shadow-base">
            <Image
              fill
              src={'/images/liked.png'}
              sizes="100%"
              alt="like img"
              className="object-cover"
            />
          </div>
        </div>
      </Link>
    </div>
  )
}
