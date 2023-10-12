'use client'

import type { Playlist } from '@/types/types'

import PlaylistItem from './PlaylistItem'
import PlaylistItemDropdown from './PlaylistItemDropdown'

interface PlaylistSidebarProps {
  data: Playlist[]
  likedPlaylist: Playlist[]
}
const PlaylistSidebar: React.FC<PlaylistSidebarProps> = ({
  data,
  likedPlaylist,
}) => {
  return (
    <div className="mt-2 flex flex-col gap-y-2 px-3 pb-2">
      {data.map(item => (
        <PlaylistItemDropdown key={item.id} data={item}>
          <PlaylistItem data={item} />
        </PlaylistItemDropdown>
      ))}

      {likedPlaylist.map((item, index) => (
        <PlaylistItem key={index} data={item} />
      ))}
    </div>
  )
}

export default PlaylistSidebar
