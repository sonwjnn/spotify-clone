'use client'

import type { Playlist } from '@/types/types'

import PlaylistItem from './playlist-item'
import PlaylistItemDropdown from './playlist-item-dropdown'

interface PlaylistSidebarProps {
  data: Playlist[]
  likedPlaylist: Playlist[]
}
const PlaylistSidebar: React.FC<PlaylistSidebarProps> = ({
  data,
  likedPlaylist,
}) => {
  return (
    <div className="mt-2 flex flex-col px-3 pb-2">
      {data.map(item => (
        <PlaylistItemDropdown key={item.id} data={item} type="myPlaylist">
          <PlaylistItem data={item} />
        </PlaylistItemDropdown>
      ))}

      {likedPlaylist.map(item => (
        <PlaylistItemDropdown key={item.id} data={item} type="otherPlaylist">
          <PlaylistItem data={item} />
        </PlaylistItemDropdown>
      ))}
    </div>
  )
}

export default PlaylistSidebar
