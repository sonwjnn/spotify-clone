"use client";

import { PlayIcon, SingleMusicNote } from "@/public/icons";
import { MediaItemProps } from "@/types/track";
import { getDurationSong } from "@/utils/durationConvertor";
import React, { memo, useState } from "react";
import useMainLayout from "@/stores/useMainLayout";
import usePlayer from "@/stores/usePlayer";
import Image from "next/image";
import useLoadImage from "@/hooks/useLoadImage";
import { buckets } from "@/utils/constants";
import dayjs from "dayjs";
import LikeButton from "./LikeButton";
import MediaDropdown from "./MediaDropdown";

const MediaItem: React.FC<MediaItemProps> = ({
  isExplicit = false,
  type = "default",
  index,
  song,
  playlist,
  selectedId,
}) => {
  const { width } = useMainLayout();
  const imageUrl = useLoadImage(song.image_path, buckets.images);
  const player = usePlayer();

  const [isHover, setHover] = useState<boolean>(false);

  const isSelected = selectedId === song.id;
  const isActived =
    player.activeId === song.id &&
    playlist?.id.toString() === player.playlistPlayingId;

  return (
    <div
      className={`
        grid list-bar group gap-4
        ${width <= 780 && type !== "album" && "grid-md"}
        ${type === "album" && "is-search-result"}
        ${type === "search" && "is-search-result"}
        ${type === "playlist" && ""}
        ${isSelected && "bg-neutral-800/50"}
        transition cursor-pointer rounded-md px-4 h-[56px] w-full hover:bg-neutral-800/50 items-center
      `}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {type !== "search" && (
        <div className="text-base text-neutral-400 relative">
          {index && player.isPlaying && isActived ? (
            <div className="relative h-full w-3  ml-2 overflow-hidden flex items-center ">
              <Image
                src={"/images/animation/equaliser-animated-green.f5eb96f2.gif"}
                sizes={"100%"}
                height={20}
                width={20}
                alt="equaliser"
              />
            </div>
          ) : (
            <div
              className={`
                text-sm flex items-center  justify-end w-4 
                ${isActived ? "text-[#2ed760]" : "text-neutral-400"}
              `}
            >
              {isHover ? <PlayIcon size={12} color={`#a3a3a3`} /> : index}
            </div>
          )}
        </div>
      )}
      <div className={`flex items-center gap-4 pr-2`}>
        {type !== "album" && (
          <div className={`h-10 w-10 aspect-square overflow-hidden relative`}>
            {imageUrl ? (
              <Image
                fill
                src={imageUrl}
                sizes="100%"
                alt="Media-Item"
                className="object-cover"
              />
            ) : (
              <div
                className={`h-full w-full items-center flex justify-center bg-neutral-800`}
              >
                <SingleMusicNote />
              </div>
            )}
          </div>
        )}
        <div
          className={`flex flex-col justify-between h-full gap-[5px] flex-1 overflow-hidden`}
        >
          <p
            className={`
              ${isActived ? "text-[#2ed760]" : "text-white"}
              text-base p-0 m-0 line-clamp-1 truncate break-all`}
          >
            {song.title}
          </p>
          {type !== "artist" && (
            <div className={`flex items-center gap-[3px] w-full truncate`}>
              {isExplicit && (
                <span className="text-[9px] px-[6px] py-[3px] uppercase text-neutral-400">
                  E
                </span>
              )}
              {/* <SubTitle data={artists} /> */}
              <p className="text-neutral-400 text-sm truncate">{song.author}</p>
            </div>
          )}
        </div>
      </div>
      {type !== "album" && type !== "search" && (
        <>
          <p className="text-neutral-400 text-sm truncate">{song.title}</p>
          {width > 780 && (
            <div className={"text-sm text-neutral-400"}>
              {dayjs(song.created_at).format("DD-MM-YYYY")}
            </div>
          )}
        </>
      )}
      <div className={`group flex gap-x-3 justify-end items-center`}>
        <LikeButton isSelected={isSelected} songId={song.id} size={20} />

        <div className={"text-sm text-neutral-400"}>
          {getDurationSong({
            milliseconds: song?.duration_ms ? song?.duration_ms : 0,
          })}
        </div>

        {playlist?.id ? (
          <MediaDropdown
            className={`${isHover ? "opacity-100" : "opacity-0"}`}
            songId={song.id}
            playlistId={playlist.id}
          />
        ) : null}
      </div>
    </div>
  );
};

export default memo(MediaItem);
