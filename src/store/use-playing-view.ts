import { create } from 'zustand'

type PlayingViewProps = {
  isShowed: boolean
  setShowed: (isShowed: boolean) => void
  collapsed: () => void
  setCollapsed: (collapse: () => void) => void
  resetMinWidth: () => void
  setResetMinWidth: (resetMinWidth: () => void) => void
  resetMaxWidth: () => void
  setResetMaxWidth: (resetMaxWidth: () => void) => void
}

export const usePlayingView = create<PlayingViewProps>()(set => ({
  isShowed: false,
  setShowed: (isShowed: boolean) => set({ isShowed }),
  collapsed: () => {},
  setCollapsed: (collapse: () => void) => {
    set({
      collapsed: () => {
        collapse()
      },
    })
  },
  resetMinWidth: () => {},
  resetMaxWidth: () => {},
  setResetMinWidth: (resetMinWidth: () => void) => {
    set({
      resetMinWidth: () => {
        resetMinWidth()
      },
    })
  },
  setResetMaxWidth: (resetMaxWidth: () => void) => {
    set({
      resetMaxWidth: () => {
        resetMaxWidth()
      },
    })
  },
}))
