"use client";

import { Song } from "@/types/types";
import LikeButton from "../LikeButton";
import Image from "next/image";
import { MusicNote } from "@/public/icons";
import useLoadImage from "@/hooks/useLoadImage";
import { buckets } from "@/utils/constants";

interface SongDetailsProps {
  data: Song;
}

const SongDetails: React.FC<SongDetailsProps> = ({ data }) => {
  const imageUrl = useLoadImage(data.image_path, buckets.images);

  return (
    <div className="items-center gap-x-4 w-full md:pr-6   flex">
      <div
        className={`transition rounded-md  gap-x-2 min-w-[200px] md:min-w-0`}
      >
        <div
          className="flex items-center gap-x-3
      "
        >
          <div className="relative rounded-md min-h-[56px] min-w-[56px] overflow-hidden">
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
                <MusicNote size={50} />
              </div>
            )}
          </div>
          <div className="flex flex-col gap-y-1 overflow-hidden">
            <p className=" text-sm truncate">{data.title}</p>
            <p className="text-neutral-400 text-xs truncate">{data.author}</p>
          </div>
        </div>
      </div>
      <div>
        <LikeButton className="flex" songId={data.id} size={22} />
      </div>
    </div>
  );
};

export default SongDetails;
