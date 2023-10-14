import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface PlayingSidebarProps {
  isShowed: boolean
  setShowed: (isShowed: boolean) => void
  handleCollapsed: () => void
  setHandleCollapsed: (resetWidth: () => void, collapse: () => void) => void
}

const usePlayingSidebar = create<PlayingSidebarProps>()(
  persist(
    (set, get) => ({
      isShowed: false,
      setShowed: (isShowed: boolean) => set({ isShowed }),
      handleCollapsed: () => {},
      setHandleCollapsed: (resetWidth: () => void, collapse: () => void) => {
        set({
          handleCollapsed: () => {
            if (get().isShowed) {
              collapse()
            } else {
              resetWidth()
            }
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

export default usePlayingSidebar
