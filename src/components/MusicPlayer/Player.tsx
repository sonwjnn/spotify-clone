'use client'

import { useEffect, useRef, useState } from 'react'
import useSound from 'use-sound'

import usePlayer from '@/stores/usePlayer'
import useSelectedPlayer from '@/stores/useSelectedPlayer'
import type { Song } from '@/types/types'

import PlayButton from '../PlayButton'
import Controls from './Controls'
import SeekBar from './SeekBar'
import SongDetails from './SongDetails'
import VolumeBar from './VolumeBar'

interface PlayerProps {
  song: Song
  songUrl: string
}

const Player: React.FC<PlayerProps> = ({ song, songUrl }) => {
  const {
    ids: playerIds,
    activeId,
    isReplay,
    isRandom,
    isPlaying,
    volume,
    currentTime,
    currentTrack,
    nextTrackIndex,
    queue,
    currentTrackIndex,
    calNextTrackIndex,
    setPlaying,
    setCurrentTime,
    setCurrentTrack,
    setCurrentTrackIndex,
    setId,
    handlePlay,
    setHandlePlay,
  } = usePlayer()

  const selectedPlayer = useSelectedPlayer()

  const [trackProcess, setTrackProcess] = useState<number>(0)

  const intervalIdRef = useRef<any>()

  const isReplayRef = useRef(false)
  const isRandomRef = useRef(false)

  const [play, { duration, pause, sound }] = useSound(songUrl, {
    volume,
    loop: false,
    onplay: () => {
      setPlaying(true)
    },
    onend: () => {
      setPlaying(false)
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      onPlayNext()
    },
    onpause: () => setPlaying(false),
    format: ['mp3'],
  })

  const startTimer = (): void => {
    clearInterval(intervalIdRef?.current)
    intervalIdRef.current = setInterval(() => {
      if (sound) {
        setTrackProcess(prev => {
          const totalSeconds = Math.floor(duration || 0 / 1000)
          if (+prev + 1 > totalSeconds) return +prev
          return +prev + 1
        })
      }
    }, 1000)
  }

  useEffect(() => {
    setCurrentTime(0)
    setTrackProcess(0)
    clearInterval(intervalIdRef?.current)
    setHandlePlay(play, pause)

    if (selectedPlayer.isSelected) {
      sound?.play()
      startTimer()
    }

    return () => sound?.unload()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sound])

  useEffect(() => {
    if (!selectedPlayer.isSelected) {
      setPlaying(false)
    }
  }, [selectedPlayer.isSelected, setPlaying])

  useEffect(() => {
    if (isPlaying) {
      startTimer()
    } else {
      clearInterval(intervalIdRef?.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, currentTime])

  useEffect(() => {
    if (sound) {
      if (isReplay) {
        sound.loop(true)
      } else {
        sound.loop(false)
      }
    }
  }, [sound, isReplay])

  useEffect(() => {
    isReplayRef.current = isReplay
    isRandomRef.current = isRandom
  }, [isRandom, isReplay])

  useEffect(() => {
    calNextTrackIndex()
  }, [currentTrack, isRandom, calNextTrackIndex])

  const onPlayNext = (): void => {
    if (playerIds.length === 0) {
      return
    }

    const isReplayCurr = isReplayRef.current
    const isRandomCurr = isRandomRef.current

    const nextSong = playerIds[nextTrackIndex]

    // handle when play done queue
    if (!nextSong && !isReplayCurr && !isRandomCurr) {
      setId(playerIds[0] as string)
      setCurrentTrack({ ...queue[0] } as Song)
      setCurrentTrackIndex(0)
      return
    }

    // handle replay
    if (isReplayCurr) {
      setCurrentTime(0)
      if (sound) {
        sound.seek([0])
      }
      setTrackProcess(0)
      clearInterval(intervalIdRef?.current)
      startTimer()
      return
    }

    // default change next song
    setId(nextSong as string)
    setCurrentTrack({ ...queue[nextTrackIndex] } as Song)
    setCurrentTrackIndex(nextTrackIndex)
    calNextTrackIndex()
    selectedPlayer.setSelected(true)
  }

  const onPlayPrevious = (): void => {
    if (playerIds.length === 0) {
      return
    }

    const currentIndex = playerIds.findIndex(id => id === activeId)
    const previousSong = playerIds[currentIndex - 1]

    if (!previousSong) {
      setId(playerIds[playerIds.length - 1] as string)
      return
    }

    setCurrentTrack({ ...queue[currentTrackIndex - 1] } as Song)
    setCurrentTrackIndex(currentTrackIndex - 1)
    selectedPlayer.setSelected(true)
    setId(previousSong)
  }

  return (
    <div className="flex h-full justify-between">
      {/* Left */}
      <div className="flex w-[50%] justify-start md:w-[30%] ">
        <SongDetails data={song} />
      </div>
      {/* Left */}

      {/* Center */}
      <div className="hidden h-full w-[40%] max-w-[722px]   gap-y-1  md:flex md:flex-col">
        <Controls onPlayNext={onPlayNext} onPlayPrevious={onPlayPrevious} />

        <SeekBar
          sound={sound}
          intervalIdRef={intervalIdRef}
          setCurrentTime={setCurrentTime}
          trackProcess={trackProcess}
          setTrackProcess={setTrackProcess}
          startTimer={startTimer}
          duration={duration}
        />
      </div>
      {/* Center */}

      {/* Right */}
      <div className="flex items-center   justify-end md:hidden">
        <PlayButton
          className="h-14 w-14 translate-y-0 bg-white opacity-100"
          onClick={handlePlay}
          isPlaying={isPlaying}
        />
      </div>

      <div className="hidden w-[30%] justify-end pr-2  md:flex ">
        <VolumeBar />
      </div>
      {/* Right */}
    </div>
  )
}

export default Player
