"use client";

import { Playlist } from "@/types";
import PlaylistItemDropdown from "./PlaylistItemDropdown";
import ListItem from "../ListItem";
import PlaylistItem from "./PlaylistItem";
import useUserStore from "@/stores/useUserStore";

interface PlaylistSidebarProps {
  data: Playlist[];
}

const PlaylistSidebar: React.FC<PlaylistSidebarProps> = ({ data }) => {
  const user = useUserStore();
  return (
    <div className="flex flex-col gap-y-2 mt-2 px-3 pb-2">
      {data.map((item) => (
        <PlaylistItemDropdown key={item.id} data={item}>
          <PlaylistItem data={item} />
        </PlaylistItemDropdown>
      ))}
      <ListItem
        image="/images/liked.png"
        name="Liked Songs"
        href="/liked"
        count={user.likedSongs.length}
      />
    </div>
  );
};

export default PlaylistSidebar;
