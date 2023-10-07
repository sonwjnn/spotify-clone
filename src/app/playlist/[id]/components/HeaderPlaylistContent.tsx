"use client";

import { MusicNote } from "@/public/icons";
import useAuthModal from "@/hooks/useAuthModal";
import useLoadImage from "@/hooks/useLoadImage";
import usePlaylistModal from "@/hooks/usePlaylistModal";
import useSubscribeModal from "@/hooks/useSubscribeModal";
import { useUser } from "@/hooks/useUser";
import useMainLayout from "@/stores/useMainLayout";
import { Playlist, Song } from "@/types/types";
import { buckets } from "@/utils/constants";
import Image from "next/image";
import { useCallback } from "react";
import { getDurationSongs } from "@/utils/durationConvertor";

interface HeaderContentProps {
  data: Playlist | null;
  songs: Song[];
}
const HeaderContent: React.FC<HeaderContentProps> = ({ data, songs }) => {
  const { width } = useMainLayout();
  const { user, subscription } = useUser();
  const authModal = useAuthModal();
  const uploadModal = usePlaylistModal();

  const subcribeModal = useSubscribeModal();

  const imagePath = useLoadImage(data?.image_path!, buckets.playlist_images);

  const onClick = () => {
    if (!user) {
      return authModal.onOpen();
    }
    if (!subscription) {
      return subcribeModal.onOpen();
    }

    return uploadModal.onOpen();
  };

  const duration = useCallback(() => {
    const durations = songs.map((item) => item.duration_ms);
    const durationStr = getDurationSongs({ durations, type: "long" });

    return durationStr;
  }, [songs]);

  return (
    <div className="flex flex-col  md:flex-row items-center md:items-end gap-x-5">
      <div
        className={`${
          width <= 875 && "!h-[192px] !w-[192px]"
        } h-[232px] w-[232px] text-white bg-[#282828] rounded-sm flex items-center justify-center shadow-base `}
      >
        {imagePath ? (
          <div className="relative aspect-square h-full w-full rounded-sm overflow-hidden">
            <Image
              className="
            object-cover
          "
              src={imagePath}
              fill
              alt="Img"
              sizes="100%"
              priority={true}
            />
          </div>
        ) : (
          <MusicNote size={50} />
        )}
      </div>
      <div className="flex flex-col  gap-y-6 mt-4 md:mt-0">
        <p className="hidden md:block  text-base">Playlist</p>
        <h1
          onClick={onClick}
          className={`${width <= 1012 && "!text-5xl"} ${
            width <= 901 && "!text-3xl"
          } text-white flex text-center md:text-left text-7xl font-bold cursor-pointer`}
        >
          {data?.title || "Playlist Title"}
        </h1>
        <div className="flex flex-col items-center md:items-start gap-y-2 ">
          {data?.description && (
            <p className="hidden md:block text-sm text-desc">
              {data.description}
            </p>
          )}
          <div className="text-sm flex gap-x-2">
            <p>{`${data?.users?.full_name || "No name"} - ${data?.song_ids
              ?.length} songs${data?.song_ids?.length ? "," : ""}`}</p>
            <p className="text-desc">{`${duration()}`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderContent;
