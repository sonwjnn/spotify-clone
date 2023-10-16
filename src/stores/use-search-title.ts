import { create } from 'zustand'

interface SearchTitleProps {
  title: string
  setTitle: (title: string) => void
}

const useSearchTitle = create<SearchTitleProps>()(set => ({
  title: '',
  setTitle: (title: string) => set({ title }),
}))

export default useSearchTitle
