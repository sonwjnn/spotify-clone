"use client";

import { Playlist, Song } from "@/types/types";
import SearchPlaylist from "./SearchPlaylist";
import SongPlaylist from "./SongPlaylist";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";

interface PlaylistContentProps {
  playlist: Playlist;
  songs: Song[];
  addedSongs: Song[];
}

const PlaylistContent: React.FC<PlaylistContentProps> = ({
  playlist,
  songs,
  addedSongs,
}) => {
  const { user } = useUser();

  const router = useRouter();
  const unaddedSongs = songs.filter(
    (song: Song) => !playlist?.song_ids?.includes(song.id)
  );

  if (!user) {
    router.replace("/");
  }

  return (
    <>
      <SongPlaylist songs={addedSongs} playlist={playlist} />
      <SearchPlaylist songs={unaddedSongs} playlist={playlist} />
    </>
  );
};

export default PlaylistContent;
