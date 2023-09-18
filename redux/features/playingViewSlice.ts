import { createSlice } from '@reduxjs/toolkit'

export const playingViewSlice = createSlice({
	name: 'PlayingView',
	initialState: {
		isPlayingViewShowed: false,
	},
	reducers: {
		setPlayingViewShowed: (state, action) => {
			state.isPlayingViewShowed = action.payload
		},
	},
})

export const { setPlayingViewShowed } = playingViewSlice.actions

export default playingViewSlice.reducer
