import { create } from 'zustand'

interface selectedPlayerStore {
  isSelected: boolean
  setSelected: (isSelected: boolean) => void
}

const useSelectedPlayer = create<selectedPlayerStore>()(set => ({
  isSelected: false,
  setSelected: (isSelected: boolean) => set({ isSelected }),
}))

export default useSelectedPlayer
