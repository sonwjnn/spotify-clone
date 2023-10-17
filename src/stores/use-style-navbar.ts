import { create } from 'zustand'

interface NavStylesStore {
  playBtnVisible: boolean
  setPlayBtnVisible: (playBtnVisible: boolean) => void
  opacity: number
  setOpacity: (opacity: number) => void
}

export const useStyleNavbar = create<NavStylesStore>()(set => ({
  playBtnVisible: false,
  setPlayBtnVisible: (playBtnVisible: boolean) => set({ playBtnVisible }),
  opacity: 0,
  setOpacity: (opacity: number) => set({ opacity }),
}))
