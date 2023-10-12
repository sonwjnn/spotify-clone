import { create } from 'zustand'

import type { Playlist } from '@/types/types'

interface PlaylistModalStore {
  isOpen: boolean
  playlist: Playlist | null
  setPlaylist: (playlist: Playlist) => void
  onOpen: () => void
  onClose: () => void
}

const usePlaylistModal = create<PlaylistModalStore>(set => ({
  isOpen: false,
  playlist: null,
  setPlaylist: (playlist: Playlist) => set({ playlist }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))

export default usePlaylistModal
