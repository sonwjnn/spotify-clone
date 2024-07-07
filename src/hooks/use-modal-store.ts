import { create } from 'zustand'

export type ModalType =
  | 'auth'
  | 'confirm'
  | 'playlist'
  | 'user'
  | 'upload'
  | 'subcribe'

type ModalData = {
  apiUrl?: string
  query?: Record<string, any>
}

type ModalStore = {
  type: ModalType | null
  data: ModalData
  isOpen: boolean
  open: (type: ModalType, data?: ModalData) => void
  close: () => void
}

export const useModal = create<ModalStore>(set => ({
  type: null,
  data: {},
  isOpen: false,
  open: (type, data = {}) => set({ isOpen: true, type, data }),
  close: () => set({ type: null, isOpen: false }),
}))
