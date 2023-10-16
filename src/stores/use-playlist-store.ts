import { create } from 'zustand'

import type { Playlist } from '@/types/types'
import { getDurationSongs } from '@/utils/duration-convertor'

interface PlaylistStoreStore {
  playlist: Playlist | null
  setPlaylist: (playlist: Playlist) => void
  duration: string
  setDuration: (durations: number[], type?: 'short' | 'long') => void
}

const usePlaylistStore = create<PlaylistStoreStore>(set => ({
  playlist: null,
  setPlaylist: (playlist: Playlist) => set({ playlist }),
  duration: '',
  setDuration: (durations: number[], type?: 'short' | 'long') => {
    const duration = getDurationSongs({ durations, type })
    set({ duration })
  },
}))

export default usePlaylistStore
