"use client";

import useGetSongById from "@/hooks/useGetSongById";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import usePlayer from "@/stores/usePlayer";
import Player from "./Player";

const MusicPlayer = () => {
  const player = usePlayer();

  const { song } = useGetSongById(player.activeId);

  const songUrl = useLoadSongUrl(song!);

  if (!song || !songUrl || !player.activeId) {
    return null;
  }

  return (
    <div className="fixed bg-black bottom-0 w-full py-2 h-[80px] px-4">
      <Player key={songUrl} song={song} songUrl={songUrl} />
    </div>
  );
};

export default MusicPlayer;
