"use client";

import { Playlist } from "@/types";
import { memo, useEffect, useMemo, useState } from "react";
import PlaylistTag from "./PlaylistTag";
import useMainLayout from "@/stores/useMainLayout";

interface GreetingProps {
  playlists: Playlist[];
}

const Greeting: React.FC<GreetingProps> = ({ playlists }) => {
  const [currentHour, setCurrentHour] = useState(new Date().getHours());
  const { width } = useMainLayout();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentHour(new Date().getHours());
    }, 1000 * 60);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

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
            <PlaylistTag key={index} data={item} />
          ))}
      </div>
    </div>
  );
};

export default memo(Greeting);
