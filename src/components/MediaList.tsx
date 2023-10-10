"use client";

import useOnPlay from "@/hooks/useOnPlay";
import useClickOutside from "@/hooks/useClickOutside";
import useMainLayout from "@/stores/useMainLayout";
import { useRef, useState } from "react";
import MediaItem from "@/components/MediaItem";
import { ClockIcon } from "@/public/icons";
import { twMerge } from "tailwind-merge";
import { MediaListProps } from "@/types/track";

interface ListBarProps {
  className?: string;
  type: "default" | "playlist" | "album" | "search" | "artist";
}

const ListBar: React.FC<ListBarProps> = ({ className, type }) => {
  const { width } = useMainLayout();
  return (
    <div
      className={twMerge(
        `
      grid list-bar group gap-4
      ${width <= 780 && type !== "album" && "grid-md"}
      ${type === "album" && "is-search-result"}
      ${type === "search" && "is-search-result"}
      ${type === "playlist" && ""}
      w-full  items-center px-4 h-9
    `,
        className
      )}
    >
      {type !== "search" && (
        <div className="text-base text-neutral-400 text-right relative">#</div>
      )}
      <div className={`flex items-center gap-4 pr-2`}>
        <div
          className={`flex flex-col justify-between h-full gap-[5px] flex-1 overflow-hidden`}
        >
          <p className="text-sm text-neutral-400">Title</p>
        </div>
      </div>
      {type !== "album" && type !== "search" && (
        <>
          <p className="text-neutral-400 text-sm truncate">Album</p>
          {width > 780 && (
            <div className={"text-sm text-neutral-400"}>Date added</div>
          )}
        </>
      )}
      <div
        className={`flex text-neutral-400 gap-x-3 justify-center items-center translate-x-1`}
      >
        <ClockIcon />
      </div>
    </div>
  );
};

const MediaList: React.FC<MediaListProps> = ({
  songs,
  playlist,
  type = "default",
}) => {
  const onPlay = useOnPlay(songs);
  const [selectedId, setSelectedId] = useState<string>("");

  const wrapperRef = useRef(null);
  useClickOutside(wrapperRef, () => {
    setSelectedId("");
  });

  return (
    <>
      <div
        className="flex flex-col  w-full px-6 pb-2 min-h-[20vh]"
        ref={wrapperRef}
      >
        {songs.length ? (
          <ListBar
            className="mb-2 relative before:content-[''] before:absolute before:h-[1px] before:w-full before:bg-neutral-800 before:bottom-0"
            type={type}
          />
        ) : null}
        {songs.map((song, index) => (
          <div key={song.id} className="flex items-center gap-x-4 w-full">
            <div
              className="flex-1"
              onClick={() => setSelectedId(song.id)}
              onDoubleClick={() => onPlay(song.id)}
            >
              <MediaItem
                type={type}
                song={song}
                playlist={playlist}
                index={index + 1}
                selectedId={selectedId}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MediaList;
