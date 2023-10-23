import { create } from 'zustand'

interface NavStylesStore {
  playBtnVisible: boolean
  setPlayBtnVisible: (playBtnVisible: boolean) => void
  usernameVisible: boolean
  setUsernameVisible: (usernameVisible: boolean) => void
  opacity: number
  setOpacity: (opacity: number) => void
}

export const useStyleNavbar = create<NavStylesStore>()(set => ({
  playBtnVisible: false,
  setPlayBtnVisible: (playBtnVisible: boolean) => set({ playBtnVisible }),
  usernameVisible: false,
  setUsernameVisible: (usernameVisible: boolean) => set({ usernameVisible }),
  opacity: 0,
  setOpacity: (opacity: number) => set({ opacity }),
}))
