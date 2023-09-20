import { create } from 'zustand'

interface playingViewStore {
	isShowed: boolean
	setShowed: (isShowed: boolean) => void
}

const usePlayingView = create<playingViewStore>((set) => ({
	isShowed: false,
	setShowed: (isShowed: boolean) => set({ isShowed }),
}))

export default usePlayingView
