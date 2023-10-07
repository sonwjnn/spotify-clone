"use client";

import { MusicNote, SingleMusicNote } from "@/public/icons";
import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types/types";
import Skeleton from "react-loading-skeleton";

interface NextSongProps {
  song: Song | undefined;
}
const NextSong: FC<NextSongProps> = ({ song }) => {
  const imagePath = useLoadImage(song?.image_path!, "images");

  const handleOnNextSong = () => {};

  return (
    <div
      className={"rouned-2xl p-4 pb-2 bg-neutral-400/5 flex flex-col w-full"}
    >
      <div className={"flex flex-row justify-between "}>
        <span className={"text-base font-bold text-white truncate"}>
          Next in queue
        </span>
        <Link href={`/queue`}>
          <div className="hover:text-white underline scale-[1.04] ">
            <button className="outline-none border-none focus:outline-none bg-transparent font-bold text-sm text-neutral-400 origin-center transition cursor-pointer">
              Open queue
            </button>
          </div>
        </Link>
      </div>
      <div className={"mt-4"}>
        <div
          onClick={handleOnNextSong}
          className={
            "flex flex-row gap-3 p-2 h-[64px] items-center rounded-lg overflow-hidden hover:bg-neutral-400/10 transition"
          }
        >
          <div className={"w-4"}>
            <SingleMusicNote size={16} />
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
          <div className={"flex flex-col overflow-hidden flex-1"}>
            {song?.title ? (
              <Link href={`/`}>
                {/* <Marquee */}
                {/* 	pauseOnHover={true} */}
                {/* 	speed={20} */}
                {/* 	direction={'right'} */}
                {/* > */}
                <span
                  className={
                    "text-base text-white font-bold cursor-pointer hover:underline truncate"
                  }
                >
                  {song?.title}
                </span>
                {/* </Marquee> */}
              </Link>
            ) : (
              <Skeleton height={"100%"} borderRadius={50} />
            )}
            {song?.author ? (
              <span className={"text-sm truncate"}>{song?.author}</span>
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
