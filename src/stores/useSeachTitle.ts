import { create } from 'zustand'

interface searchTitleProps {
	title: string
	setTitle: (title: string) => void
}

const useSearchTitle = create<searchTitleProps>()(
	(set) => ({
		title: '',
		setTitle: (title: string) => set({ title }),
	}),
)

export default useSearchTitle
