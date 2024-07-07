import { create } from 'zustand'

type SidebarSheetStore = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useSidebarSheet = create<SidebarSheetStore>()(set => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
