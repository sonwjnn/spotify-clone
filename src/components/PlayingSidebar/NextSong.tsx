"use client";

import { MusicNote, PlayIcon, SingleMusicNote } from "@/public/icons";
import { FC, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types/types";
import Skeleton from "react-loading-skeleton";
import usePlayer from "@/stores/usePlayer";

interface NextSongProps {
  song: Song | undefined;
}
const NextSong: FC<NextSongProps> = ({ song }) => {
  const player = usePlayer();
  const imagePath = useLoadImage(song?.image_path!, "images");

  const [isHover, setHover] = useState<boolean>(false);

  const handleOnNextSong = () => {
    if (song) {
      player.setId(song?.id);
    }
  };

  return (
    <div
      className={"rouned-2xl p-4 pb-2 bg-neutral-400/5 flex flex-col w-full "}
    >
      <div className={"flex flex-row justify-between "}>
        <span className={"text-base font-bold text-white truncate"}>
          Next in queue
        </span>
        <Link href={`/queue`}>
          <div className="hover:text-white underline scale-[1.04] ">
            <button className="outline-none hover:underline border-none focus:outline-none bg-transparent font-bold text-sm text-neutral-400 origin-center transition cursor-pointer">
              Open queue
            </button>
          </div>
        </Link>
      </div>
      <div className={"mt-4 "}>
        <div
          onDoubleClick={handleOnNextSong}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className={
            "flex flex-row gap-3 p-2 h-[64px] items-center rounded-lg overflow-hidden  hover:bg-neutral-400/10 transition cursor-pointer"
          }
        >
          <div className={"w-4"}>
            {isHover ? (
              <PlayIcon color="#ffffff" size={14} />
            ) : (
              <SingleMusicNote size={16} />
            )}
          </div>
          <div className={" h-12 w-12"}>
            {imagePath ? (
              <div className="relative aspect-square h-full w-full rounded-md overflow-hidden">
                <Image
                  className="
            object-cover
          "
                  src={imagePath}
                  fill
                  alt="Img"
                  sizes="100%"
                />
              </div>
            ) : (
              <div
                className={
                  "h-full w-full text-white rounded-lg bg-[#282828] flex items-center justify-center"
                }
              >
                <MusicNote size={20} />
              </div>
            )}
          </div>
          <div
            className={
              "flex flex-col overflow-hidden flex-1 select-none min-w-0"
            }
          >
            {song?.title ? (
              <span
                className={
                  "text-base text-white font-bold cursor-pointer hover:underline truncate "
                }
              >
                {song?.title}
              </span>
            ) : (
              <Skeleton height={"100%"} borderRadius={50} />
            )}
            {song?.author ? (
              <span className={"text-sm text-neutral-400 truncate select-none"}>
                {song?.author}
              </span>
            ) : (
              <Skeleton height={"100%"} width={"40%"} borderRadius={50} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NextSong;
