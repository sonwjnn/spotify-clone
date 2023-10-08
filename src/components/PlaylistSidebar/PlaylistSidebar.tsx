"use client";

import { Playlist } from "@/types/types";
import PlaylistItemDropdown from "./PlaylistItemDropdown";
import PlaylistItem from "./PlaylistItem";

interface PlaylistSidebarProps {
  data: Playlist[];
}

const PlaylistSidebar: React.FC<PlaylistSidebarProps> = ({ data }) => {
  return (
    <div className="flex flex-col gap-y-2 mt-2 px-3 pb-2">
      {data.map((item) => (
        <PlaylistItemDropdown key={item.id} data={item}>
          <PlaylistItem data={item} />
        </PlaylistItemDropdown>
      ))}
    </div>
  );
};

export default PlaylistSidebar;