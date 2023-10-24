import { create } from 'zustand'

import type { Playlist, Song } from '@/types/types'

interface UserStore {
  likedSongs: Song[]
  playlists: Playlist[]
  likedPlaylists: Playlist[]
  setLikedSongs: (songs: Song[]) => void
  setLikedPlaylists: (playlists: Playlist[]) => void
  setPlaylists: (playlists: Playlist[]) => void
  removeLikedSong: (id: string) => void
  addLikedSong: (song: Song) => void
  removeLikedPlaylist: (id: string) => void
  addLikedPlaylist: (playlist: Playlist) => void
}

export const useUserStore = create<UserStore>()((set, get) => ({
  likedSongs: [],
  likedPlaylists: [],
  playlists: [],
  setLikedSongs: (songs: Song[]) => set({ likedSongs: songs }),
  setLikedPlaylists: (playlists: Playlist[]) =>
    set({ likedPlaylists: playlists }),
  setPlaylists: (playlists: Playlist[]) => set({ playlists }),
  removeLikedSong: (id: string) => {
    const { likedSongs } = get()
    const filteredLikedSongs = likedSongs.filter(song => song.id !== id)
    set({ likedSongs: filteredLikedSongs })
  },
  addLikedSong: (song: Song) =>
    set({ likedSongs: [...get().likedSongs, song] }),
  removeLikedPlaylist: (id: string) => {
    const { likedPlaylists } = get()
    const filteredLikedPlaylists = likedPlaylists.filter(
      playlist => playlist.id !== id
    )
    set({ likedPlaylists: filteredLikedPlaylists })
  },
  addLikedPlaylist: (playlist: Playlist) =>
    set({ likedPlaylists: [...get().likedPlaylists, playlist] }),
}))
