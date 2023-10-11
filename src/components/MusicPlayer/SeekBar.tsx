import { getDurationSong } from '@/utils/durationConvertor'
import Slider from '../ui/Slider'
import React from 'react'

interface SeekBarProps {
  sound: any
  intervalIdRef: any
  trackProcess: number
  setCurrentTime: (currentTime: number) => void
  setTrackProcess: React.Dispatch<React.SetStateAction<number>>
  startTimer: () => void
  duration: number | null
}

const SeekBar: React.FC<SeekBarProps> = ({
  sound,
  intervalIdRef,
  trackProcess,
  duration,
  setTrackProcess,
  setCurrentTime,
  startTimer,
}) => {
  const handleSliderChange = (value: number) => {
    clearInterval(intervalIdRef?.current)
    setTrackProcess(value)
  }

  const handleMouseUp = (value: number) => {
    setCurrentTime(value)
    sound.seek([value])
    startTimer()
  }

  return (
    <div className="flex gap-x-1 items-center justify-center">
      <div className="text-neutral-400 text-xs w-10 text-right">
        {getDurationSong({
          milliseconds: +trackProcess * 1000,
        })}
      </div>

      <Slider
        className="h-4 w-[60%] lg:w-full mx-1"
        value={trackProcess}
        step={1}
        maxValue={duration ? duration / 1000 : 0}
        onChange={handleSliderChange}
        onMouseUp={handleMouseUp}
      />

      <div className="text-neutral-400 text-xs w-10 text-left">
        {getDurationSong({
          milliseconds: duration ? duration : 0,
        })}
      </div>
    </div>
  )
}

export default SeekBar
