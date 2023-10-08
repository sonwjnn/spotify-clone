"use client";

import LikeButton from "@/components/LikeButton";
import MediaDropdown from "@/components/MediaDropdown";
import MediaItem from "@/components/MediaItem";
import PlayButton from "@/components/PlayButton";
import useOnPlay from "@/hooks/useOnPlay";
import useClickOutside from "@/hooks/useClickOutside";
import useMainLayout from "@/stores/useMainLayout";
import usePlayer from "@/stores/usePlayer";
import { Playlist, Song } from "@/types/types";
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import usePlayingSidebar from "@/stores/usePlayingSidebar";
import { useUser } from "@/hooks/useUser";
import PlaylistLikeButton from "@/components/PlaylistLikeButton";

interface PlaylistSongProps {
  songs: Song[];
  playlist: Playlist;
}

const PlaylistSong: React.FC<PlaylistSongProps> = ({ songs, playlist }) => {
  const { user } = useUser();
  const onPlay = useOnPlay(songs);
  const player = usePlayer();
  const { setShowed } = usePlayingSidebar();
  const { width } = useMainLayout();
  const [selected, setSelected] = useState<string>("");
  const [isPlaying, setPlaying] = useState(false);
  const params = useParams();

  const wrapperRef = useRef(null);
  useClickOutside(wrapperRef, () => {
    setSelected("");
  });

  useEffect(() => {
    if (player.playlistPlayingId === params.id.toString()) {
      setPlaying(player.isPlaying);
    }
  }, [player.isPlaying, player.playlistPlayingId, params.id]);

  const handleClickPlay = () => {
    if (player.playlistPlayingId !== params.id && songs?.length) {
      player.setPlaylistActiveId(params.id.toString());
      setShowed(true);
      onPlay(songs[0].id);
    } else {
      player.handlePlay();
    }
  };

  return (
    <div
      className="flex flex-col  w-full px-6 pb-2 min-h-[20vh]"
      ref={wrapperRef}
    >
      {songs.length ? (
        <>
          <div className="p-5 w-full flex gap-x-6">
            <PlayButton
              className="opacity-1 translate-y-0 h-14 w-14"
              onClick={handleClickPlay}
              isPlaying={isPlaying}
            />
            {/* <MediaDropdown /> */}
            {user?.id !== playlist.user_id ? (
              <PlaylistLikeButton size={36} playlistId={playlist.id} />
            ) : null}
          </div>
          <div
            className={`relative grid gap-4 search-layout-grid ${
              width <= 550 && "search-layout-grid-sm"
            } ${
              width <= 780 && "search-layout-grid-md"
            } p-2 w-full before:content-[""] before:absolute before:h-[1px] before:w-full before:bg-neutral-800 before:bottom-0 text-neutral-400 text-sm`}
          >
            <div className="text-right text-neutral-400">#</div>
            <div className="flex item-center text-neutral-400">Name</div>

            <div
              className={`${
                width <= 780 ? "hidden" : "flex"
              } items-center justify-end`}
            >
              Created at
            </div>
            <div
              className={`${
                width <= 550 ? "hidden" : "flex"
              } items-center justify-end`}
            >
              Duration
            </div>
            <div
              className={`${
                width <= 440 ? "hidden" : "flex"
              } flex items-center justify-end`}
            >
              Action
            </div>
          </div>
        </>
      ) : null}
      {songs.map((song, index) => (
        <div key={song.id} className="flex items-center gap-x-4 w-full">
          <div
            className="flex-1"
            onClick={() => setSelected(song.id)}
            onDoubleClick={() => onPlay(song.id)}
          >
            <MediaItem
              className={`group/media grid gap-4 search-layout-grid ${
                width <= 550
                  ? "search-layout-grid-sm"
                  : width <= 780
                  ? "search-layout-grid-md"
                  : width <= 440
                  ? "search-layout-grid-se"
                  : null
              } `}
              actived={player.activeId}
              playlistId={params.id.toString()}
              selected={selected}
              data={song}
              index={index + 1}
              isDuration={true}
              isCreatedAt={true}
            >
              <div className={`flex justify-end items-center`}>
                <LikeButton
                  selected={selected}
                  className=" mr-4 "
                  songId={song.id}
                />
                <MediaDropdown songId={song.id} playlistId={playlist.id} />
              </div>
            </MediaItem>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlaylistSong;
