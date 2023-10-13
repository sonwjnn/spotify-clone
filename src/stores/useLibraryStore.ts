import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface LibraryStoreProps {
  isCollapsed: boolean
  setIsCollapsed: (isCollapsed: boolean) => void
  handleCollapsed: () => void
  setHandleCollapsed: (resetWidth: () => void, collapse: () => void) => void
}

const useLibraryStore = create<LibraryStoreProps>()(
  persist(
    (set, get) => ({
      isCollapsed: false,
      setIsCollapsed: (isCollapsed: boolean) => set({ isCollapsed }),
      handleCollapsed: () => {},
      setHandleCollapsed: (resetWidth: () => void, collapse: () => void) => {
        set({
          handleCollapsed: () => {
            if (!get().isCollapsed) {
              collapse()
            } else {
              resetWidth()
            }
          },
        })
      },
    }),
    {
      name: 'library-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)

export default useLibraryStore
