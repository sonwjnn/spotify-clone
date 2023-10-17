import React from 'react'

import {
  RepeatIcon,
  ShuffleIcon,
  SkipBackIcon,
  SkipForwardIcon,
} from '@/public/icons'
import usePlayer from '@/stores/use-player'

import PlayButton from '../play-button'
import { Tooltip } from '../ui/tooltip'

interface ControlsProps {
  onPlayPrevious: () => void
  onPlayNext: () => void
}

const Controls: React.FC<ControlsProps> = ({ onPlayPrevious, onPlayNext }) => {
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
            'cursor-pointer  text-neutral-400  transition hover:text-white'
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
          className="cursor-pointer text-neutral-400 transition hover:text-white"
        >
          <SkipBackIcon />
        </div>
      </Tooltip>

      <Tooltip text={`${isPlaying ? 'Pause' : 'Play'}`}>
        <PlayButton
          onClick={handlePlay}
          isPlaying={isPlaying}
          iconSize={18}
          className="h-[36px] w-[36px] translate-y-0 bg-white p-2 opacity-100"
        />
      </Tooltip>

      <Tooltip text="Next">
        <div
          onClick={() => {
            setPlaying(false)
            onPlayNext()
          }}
          className="cursor-pointer text-neutral-400 transition hover:text-white"
        >
          <SkipForwardIcon />
        </div>
      </Tooltip>

      <Tooltip text={`${isReplay ? 'Disable' : 'Enable'} replay`}>
        <div
          onClick={() => setReplay(!isReplay)}
          className={`cursor-pointer text-neutral-400 transition hover:text-white`}
        >
          <RepeatIcon color={isReplay ? '#22e55c' : undefined} />
        </div>
      </Tooltip>
    </div>
  )
}

export default Controls
