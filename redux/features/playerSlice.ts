import { createSlice } from '@reduxjs/toolkit'
import { Song } from '@/types'
interface PlayerState {
	currentSong: Song | undefined
	isPlaying: boolean
	isReplay: boolean
	isSuffle: boolean
	volume: number
	currentTime: number
}

const initialState: PlayerState = {
	currentSong: undefined,
	isPlaying: false,
	isReplay: false,
	isSuffle: false,
	volume: 0.5,
	currentTime: 0,
}

const playerSlice = createSlice({
	name: 'player',
	initialState,
	reducers: {
		setCurrentSong: (state, action) => {
			state.currentSong = action.payload
		},
		setPlaying: (state, action) => {
			state.isPlaying = action.payload
		},
		setReplay: (state, action) => {
			state.isReplay = action.payload
		},
		setSuffle: (state, action) => {
			state.isSuffle = action.payload
		},
		setVolume: (state, action) => {
			state.volume = action.payload
		},
		setCurrentTime: (state, action) => {
			state.currentTime = action.payload
		},
	},
})

export const {
	setCurrentSong,
	setPlaying,
	setReplay,
	setSuffle,
	setVolume,
	setCurrentTime,
} = playerSlice.actions

export default playerSlice.reducer
