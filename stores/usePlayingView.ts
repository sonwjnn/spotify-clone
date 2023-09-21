import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface playingViewStore {
	isShowed: boolean
	setShowed: (isShowed: boolean) => void
}

const usePlayingView = create<playingViewStore>()(
	persist((set) => ({
		isShowed: false,
		setShowed: (isShowed: boolean) => set({ isShowed }),
	}), {
		name: 'playing-view-storage',
		storage: createJSONStorage(() => sessionStorage),
	}),
)

export default usePlayingView
