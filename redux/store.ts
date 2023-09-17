import { configureStore } from '@reduxjs/toolkit'
import playerReducer from './features/playerSlice'
import { setupListeners } from '@reduxjs/toolkit/dist/query'

export const store = configureStore({
	reducer: {
		player: playerReducer,
	},
	devTools: process.env.NODE_ENV !== 'production',
	// middleware: (getDefaultMiddleware) =>
	// 	getDefaultMiddleware({}).concat([userApi.middleware]),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
