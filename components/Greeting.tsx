"use client";

import { Playlist } from "@/types";
import { memo, useEffect, useMemo, useState } from "react";
import PlaylistRecommend from "./PlaylistRecommend";
import useMainLayout from "@/stores/useMainLayout";
import useHeaderColor from "@/stores/useHeaderColor";

interface GreetingProps {
  playlists: Playlist[];
}

const Greeting: React.FC<GreetingProps> = ({ playlists }) => {
  const [currentHour, setCurrentHour] = useState(new Date().getHours());
  const [isHover, setHover] = useState(false);
  const { width } = useMainLayout();
  const { bgBase, setBgBase } = useHeaderColor();

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
      if (playlists[0]?.bg_color) {
        setBgBase(playlists[0]?.bg_color);
      }
    }
  }, [isHover, setBgBase, playlists]);

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
              isHover={isHover}
              setHover={setHover}
            />
          ))}
      </div>
    </div>
  );
};

export default memo(Greeting);
