'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'

import type { SoundLevel } from '@/public/icons'
import { PlayingViewIcon, QueueIcon, SoundIcon } from '@/public/icons'
import usePlayer from '@/stores/use-player'
import usePlayingView from '@/stores/use-playing-view'

import Slider from '../ui/slider'
import { Tooltip } from '../ui/tooltip'

const VolumeBar: React.FC = () => {
  const { volume, setVolume } = usePlayer()
  const { isShowed, collapsed, resetMaxWidth } = usePlayingView()
  const [previousVolume, setPreviousVolume] = useState<number>(volume)
  const [volumeLevel, setVolumeLevel] = useState<SoundLevel>('medium')
  const router = useRouter()
  const pathname = usePathname()

  const volumeLevelFilter = useCallback((value: number): SoundLevel => {
    if (+value === 0) {
      return 'mute'
    }
    if (+value < 0.33) {
      return 'low'
    }
    if (+value < 0.66) {
      return 'medium'
    }
    return 'high'
  }, [])

  const toggleMute = (): void => {
    if (volume === 0) {
      setVolume(previousVolume)
      setVolumeLevel(volumeLevelFilter(previousVolume))
    } else {
      setPreviousVolume(volume)
      setVolume(0)
      setVolumeLevel('mute')
    }
  }

  const handleVolumeChange = (value: number): void => {
    setVolumeLevel(volumeLevelFilter(value))
    setVolume(value)
  }

  const handleClickQueueBtn = (): void => {
    if (pathname !== '/queue/') {
      router.push('/queue')
    } else {
      router.back()
    }
  }

  const handleTogglePlayingView = (): void => {
    if (isShowed) {
      collapsed()
    } else {
      resetMaxWidth()
    }
  }
  return (
    <div className="flex items-center justify-end gap-x-4 ">
      <Tooltip text="Now Playing View">
        <button
          className="flex cursor-pointer justify-center text-white"
          onClick={handleTogglePlayingView}
        >
          <PlayingViewIcon color={isShowed ? '#22e55c' : undefined} />
        </button>
      </Tooltip>

      <Tooltip text="Queue">
        <button
          className="flex cursor-pointer justify-center text-white"
          onClick={handleClickQueueBtn}
        >
          <QueueIcon color={pathname === '/queue/' ? '#22e55c' : undefined} />
        </button>
      </Tooltip>

      <div className="flex w-full min-w-[125px] items-center gap-x-2">
        <Tooltip text={volumeLevel === 'mute' ? 'Ummute' : 'Mute'}>
          <button
            className="flex cursor-pointer justify-center text-white"
            onClick={toggleMute}
          >
            <SoundIcon level={volumeLevel} />
          </button>
        </Tooltip>

        <Slider
          value={volume}
          step={0.01}
          maxValue={1}
          onChange={handleVolumeChange}
        />
      </div>
    </div>
  )
}

export default VolumeBar
