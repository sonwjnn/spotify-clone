import { create } from 'zustand'

type SearchTitleProps = {
  title: string
  setTitle: (title: string) => void
}

export const useSearchTitle = create<SearchTitleProps>()(set => ({
  title: '',
  setTitle: (title: string) => set({ title }),
}))
