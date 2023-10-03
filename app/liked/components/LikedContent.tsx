"use client";

import LikeButton from "@/components/LikeButton";
import MediaItem from "@/components/MediaItem";
import useOnPlay from "@/hooks/useOnPlay";
import { useUser } from "@/hooks/useUser";
import useUserStore from "@/stores/useUserStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface LikedContentProp {}

const LikedContent: React.FC<LikedContentProp> = () => {
  const router = useRouter();
  const { likedSongs } = useUserStore();
  const { isLoading, user } = useUser();
  const onPlay = useOnPlay(likedSongs);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [isLoading, user, router]);

  if (likedSongs.length === 0) {
    return (
      <div
        className="
      flex flex-col gap-y-2 w-full px-6 text-neutral-400
      "
      >
        No liked songs.
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-y-2 w-full p-6">
      {likedSongs.map((song) => (
        <div key={song.id} className="flex items-center gap-x-4 w-full">
          <div className="flex-1">
            <MediaItem onClick={(id: string) => onPlay(id)} data={song} />
          </div>
          <LikeButton songId={song.id} />
        </div>
      ))}
    </div>
  );
};

export default LikedContent;
