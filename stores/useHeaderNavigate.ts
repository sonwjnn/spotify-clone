import { create } from 'zustand'

interface HeaderNavigateStore {
	opacity: number
	setOpacity: (opacity: number) => void
}

const useHeaderNavigate = create<HeaderNavigateStore>()(
	(set) => ({
		opacity: 0,
		setOpacity: (opacity: number) => set({ opacity }),
	}),
)

export default useHeaderNavigate
