import React from 'react'

import { usePlayer } from '@/store/use-player'
import {
  RepeatIcon,
  ShuffleIcon,
  SkipBackIcon,
  SkipForwardIcon,
} from '@/public/icons'

import { PlayButton } from '@/components/play-button'
import { Tooltip } from '@/components/ui/tooltip'

type ControlsProps = {
  onPlayPrevious: () => void
  onPlayNext: () => void
}

export const Controls = ({ onPlayPrevious, onPlayNext }: ControlsProps) => {
  const {
    isRandom,
    setRandom,
    isPlaying,
    isReplay,
    setReplay,
    handlePlay,
    setPlaying,
  } = usePlayer()

  return (
    <div className="flex items-center justify-center gap-x-6 pb-1">
      <Tooltip text={`${isRandom ? 'Disable' : 'Enable'} suffle`}>
        <div
          onClick={() => setRandom(!isRandom)}
          className={
            'cursor-pointer  text-zinc-700 transition dark:text-neutral-400 dark:hover:text-white'
          }
        >
          <ShuffleIcon color={isRandom ? '#22e55c' : undefined} />
        </div>
      </Tooltip>

      <Tooltip text="Previous">
        <div
          onClick={() => {
            setPlaying(false)
            onPlayPrevious()
          }}
          className=" cursor-pointer text-zinc-700 transition dark:text-neutral-400 dark:hover:text-white"
        >
          <SkipBackIcon />
        </div>
      </Tooltip>

      <Tooltip text={`${isPlaying ? 'Pause' : 'Play'}`}>
        <PlayButton
          onClick={handlePlay}
          isPlaying={isPlaying}
          iconSize={18}
          className="h-[36px] w-[36px] translate-y-0 bg-green-500 p-2 opacity-100 dark:bg-white"
        />
      </Tooltip>

      <Tooltip text="Next">
        <div
          onClick={() => {
            setPlaying(false)
            onPlayNext()
          }}
          className="cursor-pointer text-zinc-700 transition dark:text-neutral-400 dark:hover:text-white"
        >
          <SkipForwardIcon />
        </div>
      </Tooltip>

      <Tooltip text={`${isReplay ? 'Disable' : 'Enable'} replay`}>
        <div
          onClick={() => setReplay(!isReplay)}
          className={`cursor-pointer text-zinc-700 transition dark:text-neutral-400 dark:hover:text-white`}
        >
          <RepeatIcon color={isReplay ? '#22e55c' : undefined} />
        </div>
      </Tooltip>
    </div>
  )
}
