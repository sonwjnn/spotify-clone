import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface LibraryStoreProps {
  isCollapsed: boolean
  setIsCollapsed: (isCollapsed: boolean) => void
}

const useLibraryStore = create<LibraryStoreProps>()(
  persist(
    set => ({
      isCollapsed: false,
      setIsCollapsed: (isCollapsed: boolean) => set({ isCollapsed }),
    }),
    {
      name: 'library-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)

export default useLibraryStore
