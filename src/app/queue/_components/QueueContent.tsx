"use client";

import LikeButton from "@/components/LikeButton";
import MediaItem from "@/components/MediaItem";
import useOnPlay from "@/hooks/useOnPlay";
import useMainLayout from "@/stores/useMainLayout";
import usePlayer from "@/stores/usePlayer";
import Link from "next/link";
import { useState } from "react";

interface QueueContentProps {}

const QueueContent: React.FC<QueueContentProps> = () => {
  const { queue, currentTrack, currentTrackIndex, isRandom, isPlaying } =
    usePlayer();

  const onPlay = useOnPlay(queue);
  const { width } = useMainLayout();
  const [selected, setSelected] = useState<string>("");

  if (queue.length === 0) {
    return (
      <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
        No songs found.
      </div>
    );
  }

  const queueNormalized = queue.filter((item) => item);

  return (
    <div className="h-full overflow-hidden pb-8 relative">
      {queueNormalized.length !== 0 ? (
        <>
          <div className="font-bold text-base text-neutral-400 m-0 mb-1 p-6 pt-0">
            Now playing
          </div>
          {/* <SongItem
                id={currentTrack?.id}
                albumData={currentTrack?.album}
                artists={currentTrack?.artists}
                duration={currentTrack?.duration_ms}
                isExplicit={currentTrack?.explicit}
                order={1}
                songName={currentTrack?.name}
                thumb={
                  currentTrack?.album?.images?.[currentTrack?.album?.images?.length - 1]
                    ?.url ?? currentTrack?.images?.[currentTrack?.images?.length - 1]?.url
                }
                originalData={currentTrack}
              /> */}
          {queue?.filter((item) => item)?.length > 1 && (
            <div className="">
              <div className="p-6 mt-10 font-bold text-base text-neutral-400">
                Next
              </div>
              {/* <SongList
                  inclHeader={false}
                  songList={
                    isRandom
                      ? queueNormalized.filter((track) => track?.id !== currentTrack?.id)
                      : queueNormalized.slice(currentTrackIndex + 1)
                  }
                  adjustOrder={1}
                /> */}
            </div>
          )}
        </>
      ) : (
        <div className="h-[50vh] min-h-[300px] flex flex-col items-center justify-center">
          <h1 className="text-[32px]">No Queue Tracks</h1>
          <Link href="/">
            <div className="text-base hover:scale-105 font-bold no-underline bg-white border border-[#878787] rounded-[48px] text-black inline-block leading-6 m-0 mb-9 px-8 py-3 text-center whitespace-nowrap ">
              Home
            </div>
          </Link>
          <a
            className="text-base text-white block font-bold no-underline hover:underline"
            href="https://www.facebook.com/profile.php?id=100011436148089"
            target="_blank"
          >
            Help
          </a>
        </div>
      )}
    </div>
  );
};

export default QueueContent;
