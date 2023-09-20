import { Song } from '@/types'
import { create } from 'zustand'

interface PlayerStore {
	ids: string[]
	activeId?: string
	isPlaying: boolean
	isRandom: boolean
	isReplay: boolean
	volume: number
	currentTime: number
	currentSong: Song | undefined
	setVolume: (volumn: number) => void
	setPlaying: (isPlaying: boolean) => void
	setRandom: (isRandom: boolean) => void
	setReplay: (isReplay: boolean) => void
	setId: (id: string) => void
	setIds: (ids: string[]) => void
	setCurrentTime: (currentTime: number) => void
	setCurrentSong: (song: Song) => void
	reset: () => void
}

const usePlayer = create<PlayerStore>((set) => ({
	ids: [],
	activeId: undefined,
	isPlaying: false,
	isRandom: false,
	isReplay: false,
	volume: 0.5,
	currentTime: 0,
	currentSong: undefined,
	setId: (id: string) => set({ activeId: id }),
	setIds: (ids: string[]) => set({ ids }),
	reset: () => set({ ids: [], activeId: undefined }),
	setVolume: (volume: number) => set({ volume }),
	setPlaying: (isPlaying: boolean) => set({ isPlaying }),
	setRandom: (isRandom: boolean) => set({ isRandom }),
	setReplay: (isReplay: boolean) => set({ isReplay }),
	setCurrentTime: (currentTime: number) => set({ currentTime }),
	setCurrentSong: (song: Song) => set({ currentSong: song }),
}))

export default usePlayer
