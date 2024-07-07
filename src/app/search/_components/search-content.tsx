'use client'

import { MediaList } from '@/components/media-list'
import type { Song } from '@/types/types'

type SearchContentProps = {
  songs: Song[]
}

export const SearchContent = ({ songs }: SearchContentProps) => {
  if (songs.length === 0) {
    return (
      <div className="flex w-full flex-col gap-y-2 px-6 text-neutral-400">
        No songs found.
      </div>
    )
  }

  return <MediaList type="search" songs={songs} />
}
