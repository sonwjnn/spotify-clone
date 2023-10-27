import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import type { Playlist, Song } from '@/types/types'

interface PlaylistStoreStore {
  playlist: Playlist | null
  playlistSongs: Song[]
  setPlaylist: (playlist: Playlist) => void
  setPlaylistSongs: (songs: Song[]) => void
  setTitle: (title: string) => void
  setImagePath: (imagePath: string) => void
  setDescription: (description: string) => void
  setLikes: (likes: number) => void
  setDuration: (duration: number) => void
  addPlaylistSong: (song: Song) => void
  removePlaylistSong: (id: string) => void
}

export const usePlaylistStore = create<PlaylistStoreStore>()(
  persist(
    (set, get) => ({
      playlist: null,
      playlistSongs: [],
      setPlaylist: (playlist: Playlist) => set({ playlist }),
      setPlaylistSongs: (songs: Song[]) => set({ playlistSongs: songs }),
      setTitle: (title: string) => {
        const { playlist } = get()
        const newPlaylist = { ...playlist, title }
        set({ playlist: newPlaylist as Playlist })
      },
      setImagePath: (imagePath: string) => {
        const { playlist } = get()
        const newPlaylist = { ...playlist, imagePath }
        set({ playlist: newPlaylist as Playlist })
      },
      setDescription: (description: string) => {
        const { playlist } = get()
        const newPlaylist = { ...playlist, description }
        set({ playlist: newPlaylist as Playlist })
      },

      setLikes: (likes: number) => {
        const { playlist } = get()
        const newplaylist = { ...playlist, likes }
        set({ playlist: newplaylist as Playlist })
      },
      setDuration: (duration: number) => {
        const { playlist } = get()
        const newPlaylist = { ...playlist, duration_ms: duration }
        set({ playlist: newPlaylist as Playlist })
      },
      addPlaylistSong: (song: Song) => {
        const { playlistSongs: songs } = get()
        const newSongs = [...songs, song]
        set({ playlistSongs: newSongs })
      },
      removePlaylistSong: (id: string) => {
        const { playlistSongs: songs } = get()
        const newSongs = songs.filter(song => song.id !== id)
        set({ playlistSongs: newSongs })
      },
    }),
    {
      name: 'playlist-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)
