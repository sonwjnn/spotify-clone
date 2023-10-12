import { create } from 'zustand'

interface SelectedPlayerStore {
  isSelected: boolean
  setSelected: (isSelected: boolean) => void
}

const useSelectedPlayer = create<SelectedPlayerStore>()(set => ({
  isSelected: false,
  setSelected: (isSelected: boolean) => set({ isSelected }),
}))

export default useSelectedPlayer
