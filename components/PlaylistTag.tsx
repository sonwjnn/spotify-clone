"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MusicNote, PlayIcon } from "@/public/icons";
import { Playlist } from "@/types";
import useLoadImage from "@/hooks/useLoadImage";
import { buckets } from "@/utils/constants";

interface PlaylistTagProps {
  data: Playlist;
}
const PlaylistTag: React.FC<PlaylistTagProps> = ({ data }) => {
  const router = useRouter();
  const imageUrl = useLoadImage(data.image_path, buckets.playlist_images);
  const onClick = () => {
    // Add authentication befire push
    router.push(`playlist/${data.id}`);
  };
  return (
    <button
      className="relative group/song flex items-center rounded-md overflow-hidden gap-x-4 bg-neutral-100/10 hover:bg-neutral-100/20 transition pr-4"
      onClick={onClick}
    >
      <div className="relative min-h-[80px] min-w-[80px]">
        {imageUrl ? (
          <Image
            className="object-cover"
            fill
            src={imageUrl}
            alt="Image"
            sizes="100%"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-neutral-800">
            <MusicNote size={40} />
          </div>
        )}
      </div>
      <p className="font-bold text-base truncate py-5">{data.title}</p>
      <div className="absolute transition opacity-0 hover:scale-110 items-center justify-center rounded-full flex bg-green-500 p-4 drop-shadow-md right-5 group-hover/song:opacity-100">
        <PlayIcon size={20} />
      </div>
    </button>
  );
};

export default PlaylistTag;
