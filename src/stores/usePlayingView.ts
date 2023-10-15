import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface PlayingViewProps {
  isShowed: boolean
  setShowed: (isShowed: boolean) => void
  collapsed: () => void
  setCollapsed: (collapse: () => void) => void
  resetMinWidth: () => void
  setResetMinWidth: (resetMinWidth: () => void) => void
  resetMaxWidth: () => void
  setResetMaxWidth: (resetMaxWidth: () => void) => void
}

const usePlayingView = create<PlayingViewProps>()(
  persist(
    set => ({
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
    }),
    {
      name: 'playing-view-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)

export default usePlayingView
