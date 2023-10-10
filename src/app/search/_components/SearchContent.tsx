"use client";

import MediaList from "@/components/MediaList";
import { Song } from "@/types/types";

interface SearchContentProps {
  songs: Song[];
}

const SearchContent: React.FC<SearchContentProps> = ({ songs }) => {
  if (songs.length === 0) {
    return (
      <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
        No songs found.
      </div>
    );
  }

  return <MediaList type="search" songs={songs} />;
};

export default SearchContent;
