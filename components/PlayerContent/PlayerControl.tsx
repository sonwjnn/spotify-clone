"use client";

import {
  PauseIcon,
  PlayIcon,
  RepeatIcon,
  ShuffleIcon,
  SkipBackIcon,
  SkipForwardIcon,
} from "@/public/icons";

import Tooltip from "../Tooltip";
import durationConvertor from "@/utils/durationConvertor";
import useSound from "use-sound";
import { Song } from "@/types";
import usePlayer from "@/stores/usePlayer";
import { useEffect, useRef, useState } from "react";
import Slider from "../Slider";
import useSelectedPlayer from "@/stores/useSelectedPlayer";

interface PlayerControlProps {
  song: Song;
  songUrl: string;
}

const PlayerControl: React.FC<PlayerControlProps> = ({ song, songUrl }) => {
  const {
    ids: playerIds,
    activeId,
    isReplay,
    isRandom,
    isPlaying,
    volume,
    currentTime,
    setPlaying,
    setReplay,
    setRandom,
    setCurrentTime,
    setId,
    setCurrentSong,
  } = usePlayer();

  const selectedPlayer = useSelectedPlayer();

  const [trackProcess, setTrackProcess] = useState<number>(0);

  const intervalIdRef = useRef<any>();

  const isReplayRef = useRef(false);
  const isRandomRef = useRef(false);

  const [play, { duration, pause, sound }] = useSound(songUrl, {
    volume: volume,
    loop: false,
    onplay: () => {
      setPlaying(true);
      setCurrentSong(song);
    },
    onend: () => {
      setPlaying(false);
      onPlayNext();
    },
    onpause: () => setPlaying(false),
    format: ["mp3"],
  });

  const startTimer = () => {
    clearInterval(intervalIdRef?.current);
    intervalIdRef.current = setInterval(() => {
      if (sound) {
        setTrackProcess((prev) => {
          const totalSeconds = Math.floor(duration ? duration : 0 / 1000);
          if (+prev + 1 > totalSeconds) return +prev;
          return +prev + 1;
        });
      }
    }, 1000);
  };

  useEffect(() => {
    setCurrentTime(0);
    setTrackProcess(0);
    clearInterval(intervalIdRef?.current);

    if (selectedPlayer.isSelected) {
      sound?.play();
      startTimer();
    }

    return () => {
      sound?.unload();
    };
  }, [sound]);

  useEffect(() => {
    if (!selectedPlayer.isSelected) {
      setPlaying(false);
    }
  }, [selectedPlayer.isSelected]);

  useEffect(() => {
    if (isPlaying) {
      startTimer();
    } else {
      clearInterval(intervalIdRef?.current);
    }
  }, [isPlaying, currentTime]);

  useEffect(() => {
    if (sound) {
      if (isReplay) {
        sound.loop(true);
      } else {
        sound.loop(false);
      }
    }
  }, [sound, isReplay]);

  useEffect(() => {
    isReplayRef.current = isReplay;
    isRandomRef.current = isRandom;
  }, [isRandom, isReplay]);

  const onPlayNext = () => {
    if (playerIds.length === 0) {
      return;
    }

    const isReplay = isReplayRef.current;
    const isRandom = isRandomRef.current;

    const currentIndex = playerIds.findIndex((id) => id === activeId);
    const nextSong = playerIds[currentIndex + 1];

    if (!nextSong && !isReplay && !isRandom) {
      return setId(playerIds[0]);
    }

    // handle random
    if (isRandom) {
      const randomLength = playerIds.length;
      const max = randomLength - 1;
      let randomIndex = currentIndex;

      while (currentIndex === randomIndex) {
        randomIndex = Math.floor(Math.random() * max);
      }

      const randomSong = playerIds[randomIndex];

      return setId(randomSong);
    }

    // handle replay
    if (isReplay) {
      setCurrentTime(0);
      if (sound) {
        sound.seek([0]);
      }
      setTrackProcess(0);
      clearInterval(intervalIdRef?.current);
      startTimer();
      return;
    }

    // default change next song
    selectedPlayer.setSelected(true);
    setId(nextSong);
  };

  const onPlayPrevious = () => {
    if (playerIds.length === 0) {
      return;
    }

    const currentIndex = playerIds.findIndex((id) => id === activeId);
    const previousSong = playerIds[currentIndex - 1];

    if (!previousSong) {
      return setId(playerIds[playerIds.length - 1]);
    }

    selectedPlayer.setSelected(true);
    setId(previousSong);
  };

  const handlePlay = () => {
    if (!isPlaying) {
      play();
    } else {
      pause();
    }
  };

  const Icon = isPlaying ? PauseIcon : PlayIcon;

  const handleSliderChange = (value: number) => {
    clearInterval(intervalIdRef?.current);
    setTrackProcess(value);
  };

  const handleMouseUp = (value: number) => {
    setCurrentTime(value);
    sound.seek([value]);
    startTimer();
  };

  return (
    <>
      <div className="hidden h-full md:flex md:flex-col   gap-y-1  w-[40%] max-w-[722px]">
        <div className="flex gap-x-6 pb-1 justify-center items-center">
          <Tooltip text={`${isRandom ? "Disable" : "Enable"} suffle`}>
            <button
              onClick={() => setRandom(!isRandom)}
              className={
                "text-neutral-400  cursor-pointer  transition hover:text-white"
              }
            >
              <ShuffleIcon color={isRandom ? "#22e55c" : undefined} />
            </button>
          </Tooltip>

          <Tooltip text="Previous">
            <button
              onClick={onPlayPrevious}
              className="text-neutral-400 cursor-pointer hover:text-white transition"
            >
              <SkipBackIcon />
            </button>
          </Tooltip>

          <Tooltip text={`${isPlaying ? "Pause" : "Play"}`}>
            <div
              onClick={handlePlay}
              className={`flex items-center justify-center w-[36px] h-[36px] rounded-full bg-white p-1 cursor-pointer transition active:scale-100 hover:scale-110`}
            >
              <Icon />
            </div>
          </Tooltip>

          <Tooltip text="Next">
            <button
              onClick={onPlayNext}
              className="text-neutral-400 cursor-pointer hover:text-white transition"
            >
              <SkipForwardIcon />
            </button>
          </Tooltip>

          <Tooltip text={`${isReplay ? "Disable" : "Enable"} replay`}>
            <button
              onClick={() => setReplay(!isReplay)}
              className={`text-neutral-400 cursor-pointer transition hover:text-white`}
            >
              <RepeatIcon color={isReplay ? "#22e55c" : undefined} />
            </button>
          </Tooltip>
        </div>
        <div className="flex gap-x-1 items-center justify-center">
          <div className="text-neutral-400 text-xs w-8">
            {durationConvertor({
              milliseconds: +trackProcess * 1000,
            })}
          </div>

          <Slider
            className="h-4 mr-1 w-[60%] lg:w-full"
            value={trackProcess}
            step={1}
            maxValue={duration ? duration / 1000 : 0}
            onChange={handleSliderChange}
            onMouseUp={handleMouseUp}
          />

          <div className="text-neutral-400 text-xs w-8">
            {durationConvertor({
              milliseconds: duration ? duration : 0,
            })}
          </div>
        </div>
      </div>

      <div className="flex md:hidden  w-full justify-end items-center">
        <div
          onClick={handlePlay}
          className="h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer"
        >
          <Icon size={20} />
        </div>
      </div>
    </>
  );
};

export default PlayerControl;
