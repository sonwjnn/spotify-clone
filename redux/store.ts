import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'

import playerReducer from './features/playerSlice'
import playingViewReducer from './features/playingViewSlice'

export const store = configureStore({
	reducer: {
		player: playerReducer,
		playingView: playingViewReducer,
	},
	devTools: process.env.NODE_ENV !== 'production',
	// middleware: (getDefaultMiddleware) =>
	// 	getDefaultMiddleware({}).concat([userApi.middleware]),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
