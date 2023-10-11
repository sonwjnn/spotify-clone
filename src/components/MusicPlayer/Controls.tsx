import React from 'react'
import Tooltip from '../ui/Tooltip'
import {
  RepeatIcon,
  ShuffleIcon,
  SkipBackIcon,
  SkipForwardIcon,
} from '@/public/icons'

import usePlayer from '@/stores/usePlayer'
import PlayButton from '../PlayButton'

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
    <div className="flex gap-x-6 pb-1 justify-center items-center">
      <Tooltip text={`${isRandom ? 'Disable' : 'Enable'} suffle`}>
        <button
          onClick={() => setRandom(!isRandom)}
          className={
            'text-neutral-400  cursor-pointer  transition hover:text-white'
          }
        >
          <ShuffleIcon color={isRandom ? '#22e55c' : undefined} />
        </button>
      </Tooltip>

      <Tooltip text="Previous">
        <button
          onClick={() => {
            setPlaying(false)
            onPlayPrevious()
          }}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        >
          <SkipBackIcon />
        </button>
      </Tooltip>

      <Tooltip text={`${isPlaying ? 'Pause' : 'Play'}`}>
        <PlayButton
          onClick={handlePlay}
          isPlaying={isPlaying}
          iconSize={18}
          className="opacity-100 translate-y-0 w-[36px] h-[36px] bg-white p-2"
        />
      </Tooltip>

      <Tooltip text="Next">
        <button
          onClick={() => {
            setPlaying(false)
            onPlayNext()
          }}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        >
          <SkipForwardIcon />
        </button>
      </Tooltip>

      <Tooltip text={`${isReplay ? 'Disable' : 'Enable'} replay`}>
        <button
          onClick={() => setReplay(!isReplay)}
          className={`text-neutral-400 cursor-pointer transition hover:text-white`}
        >
          <RepeatIcon color={isReplay ? '#22e55c' : undefined} />
        </button>
      </Tooltip>
    </div>
  )
}

export default Controls
