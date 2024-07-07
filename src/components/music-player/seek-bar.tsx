import React from 'react'

import { getDurationSong } from '@/utils/duration-convertor'

import { Slider } from '@/components/ui/slider'

type SeekBarProps = {
  sound: any
  intervalIdRef: any
  trackProcess: number
  setCurrentTime: (currentTime: number) => void
  setTrackProcess: React.Dispatch<React.SetStateAction<number>>
  startTimer: () => void
  duration: number | null
}

export const SeekBar = ({
  sound,
  intervalIdRef,
  trackProcess,
  duration,
  setTrackProcess,
  setCurrentTime,
  startTimer,
}: SeekBarProps) => {
  const handleSliderChange = (value: number): void => {
    clearInterval(intervalIdRef?.current)
    setTrackProcess(value)
  }

  const handleMouseUp = (value: number): void => {
    setCurrentTime(value)
    sound.seek([value])
    startTimer()
  }

  return (
    <div className="flex items-center justify-center gap-x-1">
      <div className="w-10 text-right text-xs text-zinc-700 dark:text-neutral-400">
        {getDurationSong({
          milliseconds: +trackProcess * 1000,
        })}
      </div>

      <Slider
        className="mx-1 h-4 w-[60%] lg:w-full"
        value={trackProcess}
        step={1}
        maxValue={duration ? duration / 1000 : 0}
        onChange={handleSliderChange}
        onMouseUp={handleMouseUp}
      />

      <div className="w-10 text-left text-xs text-zinc-700 dark:text-neutral-400">
        {getDurationSong({
          milliseconds: duration || 0,
        })}
      </div>
    </div>
  )
}
