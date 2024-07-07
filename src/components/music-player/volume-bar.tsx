'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'

import { usePlayer } from '@/store/use-player'
import { usePlayingView } from '@/store/use-playing-view'
import type { SoundLevel } from '@/public/icons'
import { PlayingViewIcon, QueueIcon, SoundIcon } from '@/public/icons'

import { Slider } from '@/components/ui/slider'
import { Tooltip } from '@/components/ui/tooltip'

export const VolumeBar = () => {
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
        <div
          className="flex cursor-pointer justify-center text-zinc-700 transition dark:text-white"
          onClick={handleTogglePlayingView}
        >
          <PlayingViewIcon color={isShowed ? '#22c55e' : undefined} />
        </div>
      </Tooltip>

      <Tooltip text="Queue">
        <div
          className="flex cursor-pointer justify-center text-zinc-700 transition dark:text-white"
          onClick={handleClickQueueBtn}
        >
          <QueueIcon color={pathname === '/queue/' ? '#22c55e' : undefined} />
        </div>
      </Tooltip>

      <div className="flex w-full min-w-[125px] items-center gap-x-2">
        <Tooltip text={volumeLevel === 'mute' ? 'Ummute' : 'Mute'}>
          <div
            className="flex cursor-pointer justify-center text-zinc-700 transition dark:text-white"
            onClick={toggleMute}
          >
            <SoundIcon level={volumeLevel} />
          </div>
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
