import { create } from 'zustand'

import type { UserDetails } from '@/types/types'

type UserModalStore = {
  isOpen: boolean
  userDetails: UserDetails | null
  setUserDetails: (userDetails: UserDetails) => void
  onOpen: () => void
  onClose: () => void
}

export const useUserModal = create<UserModalStore>(set => ({
  isOpen: false,
  userDetails: null,
  setUserDetails: (userDetails: UserDetails) => set({ userDetails }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
