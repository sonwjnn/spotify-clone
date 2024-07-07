'use client'

import { PlaylistCardList } from './playlist-card-list'
import type { Playlist } from '@/types/types'

type UserPlaylistContentProps = {
  data: Playlist[]
}

export const UserPlaylistContent = ({ data }: UserPlaylistContentProps) => {
  if (data.length === 0) {
    return (
      <div className="flex w-full flex-col gap-y-2 px-6 text-neutral-400">
        No songs found.
      </div>
    )
  }

  return (
    <div className="w-full px-6">
      <PlaylistCardList data={data} />
    </div>
  )
}
