'use client'

import { useCallback, useState } from 'react'
import Tooltip from '../Tooltip'
import { PlayingViewIcon, SoundIcon, SoundLevel } from '@/assets/icons'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { setVolume } from '@/redux/features/playerSlice'
import { setPlayingViewShowed } from '@/redux/features/playingViewSlice'
import Slider from '../Slider'

const Right = () => {
	const dispatch = useAppDispatch()
	const { volume } = useAppSelector((state) => state.player)
	const { isPlayingViewShowed } = useAppSelector((state) => state.playingView)
	const [previousVolume, setPreviousVolume] = useState<number>(volume)
	const [volumeLevel, setVolumeLevel] = useState<SoundLevel>('medium')

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
			dispatch(setVolume(previousVolume))
			setVolumeLevel(volumeLevelFilter(previousVolume))
		} else {
			setPreviousVolume(volume)
			dispatch(setVolume(0))
			setVolumeLevel('mute')
		}
	}

	const handleVolumeChange = (value: number) => {
		setVolumeLevel(volumeLevelFilter(value))
		dispatch(setVolume(value))
	}

	return (
		<div className='flex items-center justify-end gap-x-2 w-[120px]'>
			<Tooltip text='Playing View'>
				<button
					className='cursor-pointer flex justify-center'
					onClick={() =>
						dispatch(setPlayingViewShowed(!isPlayingViewShowed))}
				>
					<PlayingViewIcon
						color={isPlayingViewShowed ? '#22e55c' : undefined}
					/>
				</button>
			</Tooltip>

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

			<Slider
				value={volume}
				step={0.01}
				maxValue={1}
				onChange={handleVolumeChange}
			/>
		</div>
	)
}

export default Right
