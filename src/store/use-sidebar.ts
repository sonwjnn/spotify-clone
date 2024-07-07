import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type SidebarProps = {
  width: number
  height: number
  setWidth: (width: number) => void
  isCollapsed: boolean
  setIsCollapsed: (isCollapsed: boolean) => void
  isMaxWidth: boolean
  setIsMaxWidth: (isMaxWidth: boolean) => void
  collapsed: () => void
  setCollapsed: (collapse: () => void) => void
  resetMinWidth: () => void
  setResetMinWidth: (resetMinWidth: () => void) => void
  resetMaxWidth: () => void
  setResetMaxWidth: (resetMaxWidth: () => void) => void
}

export const useSidebar = create<SidebarProps>()(
  persist(
    set => ({
      width: 0,
      height: 0,
      setWidth: (width: number) => set({ width }),
      isCollapsed: false,
      isMaxWidth: false,
      setIsCollapsed: (isCollapsed: boolean) => set({ isCollapsed }),
      setIsMaxWidth: (isMaxWidth: boolean) => set({ isMaxWidth }),
      collapsed: () => {},
      resetMinWidth: () => {},
      resetMaxWidth: () => {},
      setCollapsed: (collapse: () => void) => {
        set({
          collapsed: () => {
            collapse()
          },
        })
      },
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
      name: 'sidebar-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)
