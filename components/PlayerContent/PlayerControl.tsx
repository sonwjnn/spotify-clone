'use client'

import {
	PauseIcon,
	PlayIcon,
	RepeatIcon,
	ShuffleIcon,
	SkipBackIcon,
	SkipForwardIcon,
} from '@/assets/icons'

import {
	setCurrentSong,
	setPlaying,
	setReplay,
	setSuffle,
} from '@/redux/features/playerSlice'

import Tooltip from '../Tooltip'
import durationConvertor from '@/utils/durationConvertor'
import useSound from 'use-sound'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { Song } from '@/types'
import usePlayer from '@/hooks/usePlayer'
import { useEffect, useRef, useState } from 'react'
import { setCurrentTime } from '@/redux/features/playerSlice'
import Slider from '../Slider'

interface PlayerControlProps {
	song: Song
	songUrl: string
}

const PlayerControl: React.FC<PlayerControlProps> = (
	{ song, songUrl },
) => {
	const dispatch = useAppDispatch()
	const player = usePlayer()

	const { isReplay, isSuffle, isPlaying, volume, currentTime } =
		useAppSelector((state) => state.player)

	const [trackProcess, setTrackProcess] = useState<number>(0)

	const intervalIdRef = useRef<any>()

	const isReplayRef = useRef(false)
	const isSuffleRef = useRef(false)

	const [play, { duration, pause, sound }] = useSound(
		songUrl,
		{
			volume: volume,
			loop: false,
			onplay: () => {
				dispatch(setPlaying(true))
				dispatch(setCurrentSong(song))
			},
			onend: () => {
				dispatch(setPlaying(false))
				onPlayNext()
			},
			onpause: () => dispatch(setPlaying(false)),
			format: ['mp3'],
		},
	)

	const startTimer = () => {
		clearInterval(intervalIdRef?.current)
		intervalIdRef.current = setInterval(() => {
			if (sound) {
				setTrackProcess((prev) => {
					const totalSeconds = Math.floor(
						duration ? duration : 0 / 1000,
					)
					if (+prev + 1 > totalSeconds) return +prev
					return +prev + 1
				})
			}
		}, 1000)
	}

	useEffect(() => {
		sound?.play()

		dispatch(setCurrentTime(0))
		setTrackProcess(0)
		clearInterval(intervalIdRef?.current)
		startTimer()

		return () => {
			sound?.unload()
		}
	}, [sound, dispatch])

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
		isSuffleRef.current = isSuffle
	}, [isSuffle, isReplay])

	const onPlayNext = () => {
		if (player.ids.length === 0) {
			return
		}

		const isReplay = isReplayRef.current
		const isSuffle = isSuffleRef.current

		const currentIndex = player.ids.findIndex((id) =>
			id === player.activeId
		)
		const nextSong = player.ids[currentIndex + 1]

		if (!nextSong && !isReplay && !isSuffle) {
			return player.setId(player.ids[0])
		}

		// handle random
		if (isSuffle) {
			const randomLength = player.ids.length
			const max = randomLength - 1
			let randomIndex = currentIndex

			while (currentIndex === randomIndex) {
				randomIndex = Math.floor(Math.random() * max)
			}

			const randomSong = player.ids[randomIndex]

			return player.setId(randomSong)
		}

		// handle replay
		if (isReplay) {
			dispatch(setCurrentTime(0))
			if (sound) {
				sound.seek([0])
			}
			setTrackProcess(0)
			clearInterval(intervalIdRef?.current)
			startTimer()
			return
		}

		// default change next song
		player.setId(nextSong)
	}

	const onPlayPrevious = () => {
		if (player.ids.length === 0) {
			return
		}

		const currentIndex = player.ids.findIndex((id) =>
			id === player.activeId
		)
		const previousSong = player.ids[currentIndex - 1]

		if (!previousSong) {
			return player.setId(player.ids[player.ids.length - 1])
		}

		player.setId(previousSong)
	}

	const handlePlay = () => {
		if (!isPlaying) {
			play()
		} else {
			pause()
		}
	}

	const Icon = isPlaying ? PauseIcon : PlayIcon

	const handleSliderChange = (value: number) => {
		clearInterval(intervalIdRef?.current)
		setTrackProcess(value)
	}

	const handleMouseUp = (value: number) => {
		dispatch(setCurrentTime(value))
		sound.seek([value])
		startTimer()
	}

	return (
		<>
			<div className='flex gap-x-6 pb-1 justify-center items-center'>
				<Tooltip
					text={`${isSuffle ? 'Disable' : 'Enable'} suffle`}
				>
					<button
						onClick={() => dispatch(setSuffle(!isSuffle))}
						className={'text-neutral-400  cursor-pointer  transition hover:text-white'}
					>
						<ShuffleIcon color={isSuffle ? '#22e55c' : undefined} />
					</button>
				</Tooltip>

				<Tooltip text='Previous'>
					<button
						onClick={onPlayPrevious}
						className='text-neutral-400 cursor-pointer hover:text-white transition'
					>
						<SkipBackIcon />
					</button>
				</Tooltip>

				<Tooltip
					text={`${isPlaying ? 'Pause' : 'Play'}`}
				>
					<div
						onClick={handlePlay}
						className='flex items-center justify-center w-[36px] h-[36px] rounded-full bg-white p-1 cursor-pointer'
					>
						<Icon />
					</div>
				</Tooltip>

				<Tooltip text='Next'>
					<button
						onClick={onPlayNext}
						className='text-neutral-400 cursor-pointer hover:text-white transition'
					>
						<SkipForwardIcon />
					</button>
				</Tooltip>

				<Tooltip
					text={`${isReplay ? 'Disable' : 'Enable'} replay`}
				>
					<button
						onClick={() => dispatch(setReplay(!isReplay))}
						className={`text-neutral-400 cursor-pointer transition hover:text-white`}
					>
						<RepeatIcon color={isReplay ? '#22e55c' : undefined} />
					</button>
				</Tooltip>
			</div>
			<div className='flex gap-x-1 items-center justify-center'>
				<div className='text-neutral-400 text-xs w-8'>
					{durationConvertor({
						milliseconds: +trackProcess * 1000,
					})}
				</div>

				<Slider
					className='h-4 mr-1'
					value={trackProcess}
					step={1}
					maxValue={duration ? duration / 1000 : 0}
					onChange={handleSliderChange}
					onMouseUp={handleMouseUp}
				/>

				<div className='text-neutral-400 text-xs w-8'>
					{durationConvertor({
						milliseconds: duration ? duration : 0,
					})}
				</div>
			</div>

			<div className='flex md:hidden  w-full justify-end items-center'>
				<div
					onClick={handlePlay}
					className='h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer'
				>
					<Icon size={20} />
				</div>
			</div>
		</>
	)
}

export default PlayerControl
