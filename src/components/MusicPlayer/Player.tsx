'use client'

import useSound from 'use-sound'
import { Song } from '@/types/types'
import usePlayer from '@/stores/usePlayer'
import { useEffect, useRef, useState } from 'react'
import useSelectedPlayer from '@/stores/useSelectedPlayer'
import SeekBar from './SeekBar'
import Controls from './Controls'
import PlayButton from '../PlayButton'
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
    volume: volume,
    loop: false,
    onplay: () => {
      setPlaying(true)
    },
    onend: () => {
      setPlaying(false)
      onPlayNext()
    },
    onpause: () => setPlaying(false),
    format: ['mp3'],
  })

  const startTimer = () => {
    clearInterval(intervalIdRef?.current)
    intervalIdRef.current = setInterval(() => {
      if (sound) {
        setTrackProcess(prev => {
          const totalSeconds = Math.floor(duration ? duration : 0 / 1000)
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

  const onPlayNext = () => {
    if (playerIds.length === 0) {
      return
    }

    const isReplay = isReplayRef.current
    const isRandom = isRandomRef.current

    const nextSong = playerIds[nextTrackIndex]

    // handle when play done queue
    if (!nextSong && !isReplay && !isRandom) {
      setId(playerIds[0])
      setCurrentTrack({ ...queue[0] })
      setCurrentTrackIndex(0)
      return
    }

    // handle replay
    if (isReplay) {
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
    setCurrentTrack({ ...queue[nextTrackIndex] })
    setCurrentTrackIndex(nextTrackIndex)
    calNextTrackIndex()
    selectedPlayer.setSelected(true)
    setId(nextSong)
  }

  const onPlayPrevious = () => {
    if (playerIds.length === 0) {
      return
    }

    const currentIndex = playerIds.findIndex(id => id === activeId)
    const previousSong = playerIds[currentIndex - 1]

    if (!previousSong) {
      return setId(playerIds[playerIds.length - 1])
    }

    setCurrentTrack({ ...queue[currentTrackIndex - 1] })
    setCurrentTrackIndex(currentTrackIndex - 1)
    selectedPlayer.setSelected(true)
    setId(previousSong)
  }

  return (
    <div className="flex justify-between h-full">
      {/* Left */}
      <div className="flex w-[50%] md:w-[30%] justify-start ">
        <SongDetails data={song} />
      </div>
      {/* Left */}

      {/* Center */}
      <div className="hidden h-full md:flex md:flex-col   gap-y-1  w-[40%] max-w-[722px]">
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
      <div className="flex md:hidden   justify-end items-center">
        <PlayButton
          className="opacity-1 translate-y-0 h-14 w-14 bg-white"
          onClick={handlePlay}
          isPlaying={isPlaying}
        />
      </div>

      <div className="hidden md:flex w-[30%] justify-end  pr-2 ">
        <VolumeBar />
      </div>
      {/* Right */}
    </div>
  )
}

export default Player
