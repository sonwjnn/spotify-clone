'use client'

import type { Playlist } from '@/types/types'

import { PlaylistItem } from './playlist-item'

interface PlaylistListProps {
  data: Playlist[]
}
export const PlaylistList: React.FC<PlaylistListProps> = ({ data }) => {
  return (
    <div className="mt-2 flex flex-col px-3 pb-2">
      {data.map(item => (
        <PlaylistItem key={item.id} data={item} />
      ))}
    </div>
  )
}
