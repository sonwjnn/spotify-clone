"use client";

import { Playlist } from "@/types";
import { memo, useEffect, useMemo, useState } from "react";
import PlaylistRecommend from "./PlaylistRecommend";
import useMainLayout from "@/stores/useMainLayout";
import useHeaderColor from "@/stores/useHeaderColor";
import useGetColorImage from "@/hooks/useGetColorImage";
import { buckets } from "@/utils/constants";

interface GreetingProps {
  playlists: Playlist[];
}

const Greeting: React.FC<GreetingProps> = ({ playlists }) => {
  const [currentHour, setCurrentHour] = useState(new Date().getHours());
  const [isHover, setHover] = useState(false);
  const { width } = useMainLayout();
  const { setBgBase } = useHeaderColor();
  const [bgColor] = useGetColorImage(
    playlists[0]?.image_path,
    buckets.playlist_images
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentHour(new Date().getHours());
    }, 1000 * 60);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (isHover) {
      setBgBase(bgColor);
    }
  }, [isHover, setBgBase, bgColor]);

  const greeting = useMemo(() => {
    if (5 <= currentHour && currentHour <= 11) return "Good morning";
    if (12 <= currentHour && currentHour <= 17) return "Good afternoon";
    return "Good evening";
  }, [currentHour]);

  return (
    <div>
      <h1 className="text-white text-3xl font-semibold">
        <p>{greeting}</p>
      </h1>
      <div
        className={`grid ${width <= 519 && "!grid-cols-1"} ${
          width <= 878 && "grid-cols-2"
        } grid-cols-3 gap-3 mt-4`}
      >
        {playlists
          ?.slice(0, 6)
          .map((item: Playlist, index) => (
            <PlaylistRecommend
              key={index}
              data={item}
              index={index}
              setHover={setHover}
            />
          ))}
      </div>
    </div>
  );
};

export default memo(Greeting);
