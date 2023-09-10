'use client'

import { Song } from '@/types'
import MediaItem from './MediaItem'
import LikeButton from './LikeButton'
import { BsPauseFill, BsPlayFill } from 'react-icons/bs'
import { AiFillStepBackward, AiFillStepForward } from 'react-icons/ai'
import { MdOutlineReplay } from 'react-icons/md'
import { FaRandom } from 'react-icons/fa'
import { HiSpeakerWave, HiSpeakerXMark } from 'react-icons/hi2'
import VolumeSlider from './VolumeSlider'
import AudioSlider from './AudioSlider'
import usePlayer from '@/hooks/usePlayer'
import { useEffect, useState } from 'react'
import useSound from 'use-sound'

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
	const [isReplay, setIsReplay] = useState<boolean>(false)
	const [isRandom, setIsRandom] = useState<boolean>(false)

	const [time, setTime] = useState({
		min: '0',
		sec: '00',
	})

	const [seconds, setSeconds] = useState(0) // current position of the audio in seconds

	const [currentTime, setCurrentTime] = useState({
		min: '0',
		sec: '00',
	})

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

	// current position of the audio in minutes and seconds

	const Icon = isPlaying ? BsPauseFill : BsPlayFill
	const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave

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
				setSeconds(sound.seek([])) // setting the seconds state with the current state
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

	const onPlayNext = () => {
		if (player.ids.length === 0) {
			return
		}

		const currentIndex = player.ids.findIndex((id) =>
			id === player.activeId
		)
		const nextSong = player.ids[currentIndex + 1]

		if (!nextSong) {
			return player.setId(player.ids[0])
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

	const onReplay = () => {
		if (player) {
			return player.setId(player.activeId!)
		}
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
		} else {
			setPreviousVolume(volume)
			setVolume(0)
		}
	}

	return (
		<div className='grid grid-cols-2 md:grid-cols-3 h-full '>
			<div className='flex  w-full justify-start '>
				<div className='flex justify-center items-center gap-x-4'>
					<MediaItem data={song} />
					<LikeButton songId={song.id} />
				</div>
			</div>

			<div className='hidden h-full md:flex md:flex-col gap-y-1  w-full max-w-[722px] '>
				<div className='flex gap-x-6 justify-center items-center'>
					<FaRandom
						onClick={() => setIsRandom(!isRandom)}
						size={22}
						className={`${
							isRandom ? 'text-[#22c55e]' : 'text-neutral-400'
						}  cursor-pointer  transition `}
					/>
					<AiFillStepBackward
						onClick={onPlayPrevious}
						size={26}
						className='text-neutral-400 cursor-pointer hover:text-white transition'
					/>

					<div
						onClick={handlePlay}
						className='flex items-center justify-center w-10 h-10 rounded-full bg-white p-1 cursor-pointer'
					>
						<Icon size={26} className='text-black' />
					</div>

					<AiFillStepForward
						onClick={onPlayNext}
						size={26}
						className='text-neutral-400 cursor-pointer hover:text-white transition
          '
					/>

					<MdOutlineReplay
						onClick={() => setIsReplay(!isReplay)}
						size={24}
						className={`${
							isReplay ? 'text-[#22c55e]' : 'text-neutral-400'
						}  cursor-pointer  transition `}
					/>
				</div>
				<div className='flex gap-1'>
					<div className='text-neutral-400 text-xs'>
						{currentTime.min}:{currentTime.sec}
					</div>

					<AudioSlider
						className='h-4'
						value={seconds}
						maxValue={duration ? duration / 1000 : 0}
						onChange={(value) => {
							setSeconds(value)
							sound.seek([value])
						}}
					/>

					<div className='text-neutral-400 text-xs'>
						{time.min}:{time.sec}
					</div>
				</div>
			</div>

			<div className='flex md:hidden col-auto w-full justify-end items-center'>
				<div
					onClick={handlePlay}
					className='h-10 w-10 flex items-center justify-start rounded-full bg-white p-1 cursor-pointer'
				>
					<Icon size={30} className='text-black' />
				</div>
			</div>

			<div className='hidden md:flex w-full justify-end  pr-2 '>
				<div className='flex items-center gap-x-2 w-[120px]'>
					<VolumeIcon
						onClick={toggleMute}
						size={28}
						className='cursor-pointer'
					/>

					<VolumeSlider
						value={volume}
						onChange={(value) => setVolume(value)}
					/>
				</div>
			</div>
		</div>
	)
}

export default PlayerContent
