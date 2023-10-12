import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface PlayingSidebarProps {
  isShowed: boolean
  setShowed: (isShowed: boolean) => void
}

const usePlayingSidebar = create<PlayingSidebarProps>()(
  persist(
    set => ({
      isShowed: false,
      setShowed: (isShowed: boolean) => set({ isShowed }),
    }),
    {
      name: 'playing-view-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)

export default usePlayingSidebar
