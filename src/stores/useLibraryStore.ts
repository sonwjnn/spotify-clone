import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface LibraryStoreProps {
  isCollapsed: boolean
  setIsCollapsed: (isCollapsed: boolean) => void
  isMaxWidth: boolean
  setIsMaxWidth: (isMaxWidth: boolean) => void
  handleCollapsed: () => void
  setHandleCollapsed: (resetWidth: () => void, collapse: () => void) => void
  handleResetWidth: () => void
  setHandleResetWidth: (
    resetMaxWidth: () => void,
    resetMinWidth: () => void
  ) => void
}

const useLibraryStore = create<LibraryStoreProps>()(
  persist(
    (set, get) => ({
      isCollapsed: false,
      isMaxWidth: false,
      setIsCollapsed: (isCollapsed: boolean) => set({ isCollapsed }),
      setIsMaxWidth: (isMaxWidth: boolean) => set({ isMaxWidth }),
      handleCollapsed: () => {},
      handleResetWidth: () => {},
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
      setHandleResetWidth: (
        resetMaxWidth: () => void,
        resetMinWidth: () => void
      ) => {
        set({
          handleResetWidth: () => {
            if (get().isMaxWidth) {
              resetMinWidth()
            } else {
              resetMaxWidth()
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
