'use client'
import {
	PauseIcon,
	PlayIcon,
	RepeatIcon,
	ShuffleIcon,
	SkipBackIcon,
	SkipForwardIcon,
	SoundIcon,
	SoundLevel,
} from '@/assets/icons'
import { Song } from '@/types'
import MediaItem from './MediaItem'
import LikeButton from './LikeButton'
import VolumeSlider from './VolumeSlider'
import AudioSlider from './AudioSlider'
import usePlayer from '@/hooks/usePlayer'
import { useCallback, useEffect, useRef, useState } from 'react'
import useSound from 'use-sound'
import Tooltip from './Tooltip'

interface PlayerContentProps {
	song: Song
	songUrl: string
	volume: number
	setVolume: (volume: number) => void
}

const PlayerContent: React.FC<PlayerContentProps> = (
	{ songUrl, song, volume, setVolume },
) => {
	const player = usePlayer()

	const [isPlaying, setIsPlaying] = useState<boolean>(false)
	const [previousVolume, setPreviousVolume] = useState<number>(volume)
	const [isRandom, setIsRandom] = useState<boolean>(false)
	const [isReplay, setIsReplay] = useState<boolean>(false)
	const [volumeLevel, setVolumeLevel] = useState<SoundLevel>('medium')

	const [time, setTime] = useState({
		min: '0',
		sec: '00',
	})

	const [seconds, setSeconds] = useState(0)

	const [currentTime, setCurrentTime] = useState({
		min: '0',
		sec: '00',
	})

	const isReplayRef = useRef(isReplay)

	const [play, { duration, pause, sound }] = useSound(
		songUrl,
		{
			volume: volume,
			onplay: () => setIsPlaying(true),
			onend: () => {
				setIsPlaying(false)
				onPlayNext()
			},
			onpause: () => setIsPlaying(false),
			format: ['mp3'],
		},
	)

	const Icon = isPlaying ? PauseIcon : PlayIcon

	useEffect(() => {
		if (duration) {
			const durationRemain = duration / 1000
			const min = Math.floor(durationRemain / 60).toString()
			let sec = Math.floor(durationRemain % 60).toString()
			if (sec.length === 1) sec = '0' + sec
			setTime({
				min,
				sec,
			})
		}

		const interval = setInterval(() => {
			if (sound) {
				setSeconds(sound.seek([]))
				const min = Math.floor(sound.seek([]) / 60).toString()
				let sec = Math.floor(sound.seek([]) % 60).toString()
				if (sec.length === 1) sec = '0' + sec
				setCurrentTime({
					min,
					sec,
				})
			}
		}, 1000)
		return () => clearInterval(interval)
	}, [sound, duration])

	useEffect(() => {
		sound?.play()

		return () => {
			sound?.unload()
		}
	}, [sound])

	useEffect(() => {
		isReplayRef.current = isReplay
	}, [isReplay])

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

	const onPlayNext = () => {
		if (player.ids.length === 0) {
			return
		}

		const currentIndex = player.ids.findIndex((id) =>
			id === player.activeId
		)
		const nextSong = player.ids[currentIndex + 1]
		const currentSong = player.ids[currentIndex]

		if (!nextSong) {
			return player.setId(player.ids[0])
		}

		if (isReplayRef.current) {
			return player.setId(currentSong)
		}

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

	const handleAudioSliderChange = (value: number) => {
		setSeconds(value)
		const min = Math.floor(sound.seek([]) / 60)
			.toString()
		let sec = Math.floor(sound.seek([]) % 60).toString()
		if (sec.length === 1) sec = '0' + sec
		setCurrentTime({
			min,
			sec,
		})

		sound.seek([value])
	}

	//detect the click event on the keyboard: pause, play, back, forward,...

	navigator.mediaSession.setActionHandler('play', () => {
		handlePlay()
	})

	navigator.mediaSession.setActionHandler('pause', () => {
		handlePlay()
	})

	// navigator.mediaSession.setActionHandler('stop', () => {
	//   ()
	// })

	navigator.mediaSession.setActionHandler('previoustrack', () => {
		onPlayPrevious()
	})

	navigator.mediaSession.setActionHandler('nexttrack', () => {
		onPlayNext()
	})

	return (
		<div className='flex justify-between h-full'>
			<div className='flex   w-[30%] justify-start '>
				<div className='flex justify-center items-center gap-x-4'>
					<MediaItem data={song} />
					<LikeButton songId={song.id} />
				</div>
			</div>

			<div className='hidden h-full md:flex md:flex-col   gap-y-1  w-[40%] max-w-[722px] '>
				<div className='flex gap-x-6 justify-center items-center'>
					<Tooltip
						text={`${isReplay ? 'Disable' : 'Enable'} suffle`}
					>
						<button
							onClick={() => setIsRandom(!isRandom)}
							className={`${
								isRandom ? 'text-[#22c55e]' : 'text-neutral-400'
							}  cursor-pointer  transition hover:text-white`}
						>
							<ShuffleIcon />
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
							onClick={() => setIsReplay(!isReplay)}
							className={`${
								isReplay ? 'text-[#22c55e]' : 'text-neutral-400'
							}  cursor-pointer  transition hover:text-white`}
						>
							<RepeatIcon />
						</button>
					</Tooltip>
				</div>
				<div className='flex gap-x-1'>
					<div className='text-neutral-400 text-xs w-8'>
						{currentTime.min}:{currentTime.sec}
					</div>

					<AudioSlider
						className='h-4 mr-1'
						value={seconds}
						maxValue={duration ? duration / 1000 : 0}
						onChange={(value) => handleAudioSliderChange(value)}
					/>

					<div className='text-neutral-400 text-xs w-8'>
						{time.min}:{time.sec}
					</div>
				</div>
			</div>

			<div className='flex md:hidden col-auto w-full justify-end items-center'>
				<div
					onClick={handlePlay}
					className='h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer'
				>
					<Icon size={20} />
				</div>
			</div>

			<div className='hidden md:flex w-[30%] justify-end  pr-2 '>
				<div className='flex items-center gap-x-2 w-[120px]'>
					<Tooltip
						text={volumeLevel === 'mute' ? 'Ummute' : 'Mute'}
					>
						<button
							className='cursor-pointer flex justify-center'
							onClick={toggleMute}
						>
							<SoundIcon level={volumeLevel} />
						</button>
					</Tooltip>

					<VolumeSlider
						value={volume}
						onChange={(value) => {
							setVolume(value)
							setVolumeLevel(volumeLevelFilter(value))
						}}
					/>
				</div>
			</div>
		</div>
	)
}

export default PlayerContent
