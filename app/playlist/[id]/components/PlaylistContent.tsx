"use client";

import { Playlist, Song } from "@/types";
import PlaylistSearch from "./PlaylistSearch";
import PlaylistSong from "./PlaylistSong";

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
  const unaddedSongs = songs.filter(
    (song: Song) => !playlist?.song_ids?.includes(song.id)
  );

  return (
    <>
      <PlaylistSong songs={addedSongs} playlist={playlist} />
      <PlaylistSearch songs={unaddedSongs} playlist={playlist} />
    </>
  );
};

export default PlaylistContent;
