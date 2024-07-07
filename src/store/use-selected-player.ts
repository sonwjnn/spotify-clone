import { create } from 'zustand'

type SelectedPlayerStore = {
  isSelected: boolean
  setSelected: (isSelected: boolean) => void
}

export const useSelectedPlayer = create<SelectedPlayerStore>()(set => ({
  isSelected: false,
  setSelected: (isSelected: boolean) => set({ isSelected }),
}))
