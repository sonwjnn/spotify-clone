import Image from 'next/image'
import Link from 'next/link'

import useLoadImage from '@/hooks/useLoadImage'
import { MusicNote } from '@/public/icons'
import type { Playlist } from '@/types/types'
import { buckets } from '@/utils/constants'

interface ListColapseProps {
  playlists: Playlist[]
}

interface ListColapseItemProps {
  playlist: Playlist
}

const ListColapseItem: React.FC<ListColapseItemProps> = ({ playlist }) => {
  const imageUrl = useLoadImage(playlist.image_path, buckets.playlist_images)
  return (
    <div>
      {imageUrl ? (
        <div className="relative aspect-square h-14 w-14 overflow-hidden rounded-lg shadow-base">
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
        <div className="flex h-14 w-14 items-center justify-center bg-neutral-800 text-white">
          <MusicNote size={20} />
        </div>
      )}
    </div>
  )
}

const ListColapse: React.FC<ListColapseProps> = ({ playlists }) => {
  return (
    <div className="flex h-full w-full flex-col ">
      {playlists.map(playlist => (
        <Link
          href={`/playlist/${playlist.id}`}
          key={playlist.id}
          className="cursor-pointer rounded-lg  p-2 transition hover:bg-neutral-800 "
        >
          <ListColapseItem playlist={playlist} />
        </Link>
      ))}

      <Link
        href={`/liked`}
        className="cursor-pointer rounded-lg  p-2 transition hover:bg-neutral-800 "
      >
        <div className="relative aspect-square h-14 w-14 overflow-hidden rounded-lg shadow-base">
          <Image
            fill
            src={'/images/liked.png'}
            sizes="100%"
            alt="like img"
            className="object-cover"
          />
        </div>
      </Link>
    </div>
  )
}

export default ListColapse
