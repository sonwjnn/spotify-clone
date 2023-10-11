'use client'

import { useCallback, useState } from 'react'
import Tooltip from '../ui/Tooltip'
import {
  PlayingSidebarIcon,
  QueueIcon,
  SoundIcon,
  SoundLevel,
} from '/public/icons'
import Slider from '../ui/Slider'
import usePlayingSidebar from '@/stores/usePlayingSidebar'
import usePlayer from '@/stores/usePlayer'
import { usePathname, useRouter } from 'next/navigation'

const VolumeBar = () => {
  const { volume, setVolume } = usePlayer()
  const playingSidebar = usePlayingSidebar()
  const [previousVolume, setPreviousVolume] = useState<number>(volume)
  const [volumeLevel, setVolumeLevel] = useState<SoundLevel>('medium')
  const router = useRouter()
  const pathname = usePathname()

  const volumeLevelFilter = useCallback((value: number): SoundLevel => {
    if (+value === 0) {
      return 'mute'
    } else if (+value < 0.33) {
      return 'low'
    } else if (+value < 0.66) {
      return 'medium'
    } else {
      return 'high'
    }
  }, [])

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(previousVolume)
      setVolumeLevel(volumeLevelFilter(previousVolume))
    } else {
      setPreviousVolume(volume)
      setVolume(0)
      setVolumeLevel('mute')
    }
  }

  const handleVolumeChange = (value: number) => {
    setVolumeLevel(volumeLevelFilter(value))
    setVolume(value)
  }

  const handleClickQueueBtn = () => {
    if (pathname !== '/queue') {
      router.push('/queue')
    } else {
      router.back()
    }
  }

  return (
    <div className="flex items-center justify-end gap-x-4 ">
      <Tooltip text="Playing View">
        <button
          className="text-white cursor-pointer flex justify-center"
          onClick={() => playingSidebar.setShowed(!playingSidebar.isShowed)}
        >
          <PlayingSidebarIcon
            color={playingSidebar.isShowed ? '#22e55c' : undefined}
          />
        </button>
      </Tooltip>

      <Tooltip text="Queue">
        <button
          className="text-white cursor-pointer flex justify-center"
          onClick={handleClickQueueBtn}
        >
          <QueueIcon color={pathname === '/queue' ? '#22e55c' : undefined} />
        </button>
      </Tooltip>

      <div className="flex items-center gap-x-2 w-full min-w-[125px]">
        <Tooltip text={volumeLevel === 'mute' ? 'Ummute' : 'Mute'}>
          <button
            className="text-white cursor-pointer flex justify-center"
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
