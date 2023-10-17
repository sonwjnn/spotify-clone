import { create } from 'zustand'

interface SubscribeModalStore {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useSubscribeModal = create<SubscribeModalStore>(set => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
