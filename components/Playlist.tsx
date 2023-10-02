"use client";

import useLoadImage from "@/hooks/useLoadImage";
import { Playlist } from "@/types";
import Image from "next/image";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";
import useMainLayout from "@/stores/useMainLayout";
import { useParams, useRouter } from "next/navigation";
import usePlaylistModal from "@/hooks/usePlaylistModal";
import { MusicNote } from "@/public/icons";
import { buckets } from "@/utils/constants";
import PlaylistItemDropdown from "./PlaylistItemDropdown";

interface PlaylistItemProps {
  data: Playlist;
  index?: number;
  isCreatedAt?: boolean;
  className?: string;
}

interface PlaylistProps {
  data: Playlist[];
}

const PlaylistItem: React.FC<PlaylistItemProps> = ({
  data,
  className,
  isCreatedAt = false,
}) => {
  const router = useRouter();
  const { width } = useMainLayout();
  const imageUrl = useLoadImage(data.image_path, buckets.playlist_images);
  const uploadModal = usePlaylistModal();
  const { id } = useParams();

  const onClick = () => {
    uploadModal.setPlaylist(data);
    router.push(`/playlist/${data.id}`);
  };

  return (
    <div
      className={twMerge(
        ` cursor-pointer rounded-md p-2 transition w-full hover:bg-neutral-800/50 ${
          id === data.id.toString() && "bg-neutral-800/50"
        }`,
        className
      )}
    >
      <div onClick={onClick} className="flex item-center gap-x-3">
        <div className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden">
          {imageUrl ? (
            <Image
              fill
              src={imageUrl}
              sizes="100%"
              alt="Media-Item"
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-neutral-800">
              <MusicNote size={20} />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-y-1 overflow-hidden">
          <p className="text-white truncate">{data.title}</p>
          <p className="text-neutral-400 text-sm truncate">
            {`Playlist - ${data?.users?.full_name}`}
          </p>
        </div>
      </div>

      {isCreatedAt && (
        <div
          className={`${
            width <= 780 ? "hidden" : "flex"
          } text-neutral-400 text-sm items-center justify-end`}
        >
          {dayjs(data.created_at).format("DD-MM-YYYY")}
        </div>
      )}
    </div>
  );
};

const Playlist: React.FC<PlaylistProps> = ({ data }) => {
  return (
    <div className="flex flex-col gap-y-2 mt-2 px-3 pb-2">
      {data.map((item) => (
        <PlaylistItemDropdown key={item.id} data={item}>
          <PlaylistItem data={item} />
        </PlaylistItemDropdown>
      ))}
    </div>
  );
};

export default Playlist;
