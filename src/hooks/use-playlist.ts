import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import type { Playlist, Song } from '@/types/types'

interface PlaylistStore {
  playlist: Playlist | null
  playlistSongs: Song[]
  setPlaylist: (playlist: Playlist) => void
  setPlaylistSongs: (songs: Song[]) => void
  setTitle: (title: string) => void
  setImagePath: (imagePath: string) => void
  setDescription: (description: string) => void
  setBgColor: (bgColor: string) => void
  setLikes: (likes: number) => void
  setDuration: (duration: number) => void
  addPlaylistSong: (song: Song) => void
  removePlaylistSong: (id: string) => void
}

export const usePlaylist = create<PlaylistStore>()(
  persist(
    (set, get) => ({
      playlist: null,
      playlistSongs: [],
      setPlaylist: (playlist: Playlist) => set({ playlist }),
      setPlaylistSongs: (songs: Song[]) => set({ playlistSongs: songs }),
      setTitle: (title: string) => {
        const { playlist } = get()
        set({ playlist: { ...playlist, title } as Playlist })
      },
      setImagePath: (imagePath: string) => {
        const { playlist } = get()
        set({ playlist: { ...playlist, image_path: imagePath } as Playlist })
      },
      setBgColor: (bgColor: string) => {
        const { playlist } = get()
        set({ playlist: { ...playlist, bg_color: bgColor } as Playlist })
      },
      setDescription: (description: string) => {
        const { playlist } = get()
        set({ playlist: { ...playlist, description } as Playlist })
      },

      setLikes: (likes: number) => {
        const { playlist } = get()
        set({ playlist: { ...playlist, likes } as Playlist })
      },
      setDuration: (duration: number) => {
        const { playlist } = get()
        set({ playlist: { ...playlist, duration_ms: duration } as Playlist })
      },
      addPlaylistSong: (song: Song) => {
        const { playlistSongs: songs } = get()
        set({ playlistSongs: [...songs, song] })
      },
      removePlaylistSong: (id: string) => {
        const { playlistSongs: songs } = get()
        set({ playlistSongs: songs.filter(song => song.id !== id) })
      },
    }),
    {
      name: 'playlist-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)
