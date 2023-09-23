import { create } from 'zustand'

interface HeaderNavigateStore {
	opacity: number
	setOpacity: (opacity: number) => void
	handleScroll: (e: React.UIEvent<HTMLDivElement, UIEvent>) => void
}

const useHeaderNavigate = create<HeaderNavigateStore>()(
	(set) => ({
		opacity: 0,
		setOpacity: (opacity: number) => set({ opacity }),
		handleScroll: (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
			const yAxis = e.currentTarget.scrollTop
			if (yAxis > 120) {
				set({ opacity: 1 })
			} else set({ opacity: yAxis / 120 })
		},
	}),
)

export default useHeaderNavigate
