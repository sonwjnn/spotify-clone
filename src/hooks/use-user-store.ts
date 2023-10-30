import { create } from 'zustand'

import type { Playlist, Song } from '@/types/types'

interface UserStore {
  likedSongs: Song[]
  playlists: Playlist[]
  likedPlaylists: Playlist[]
  setLikedSongs: (songs: Song[]) => void
  setLikedPlaylists: (playlists: Playlist[]) => void
  setPlaylists: (playlists: Playlist[]) => void
  addLikedSong: (song: Song) => void
  addLikedPlaylist: (playlist: Playlist) => void
  addPlaylist: (playlist: Playlist) => void
  removeLikedSong: (id: string) => void
  removeLikedPlaylist: (id: string) => void
  removePlaylist: (id: string) => void
  updatePlaylist: (updatedPlaylist: Playlist) => void
}

export const useUserStore = create<UserStore>()((set, get) => ({
  likedSongs: [],
  likedPlaylists: [],
  playlists: [],
  setLikedSongs: (songs: Song[]) => set({ likedSongs: songs }),
  setLikedPlaylists: (playlists: Playlist[]) =>
    set({ likedPlaylists: playlists }),
  setPlaylists: (playlists: Playlist[]) => set({ playlists }),
  addLikedSong: (song: Song) =>
    set({ likedSongs: [...get().likedSongs, song] }),
  addPlaylist: (playlist: Playlist) =>
    set({ playlists: [...get().playlists, playlist] }),
  addLikedPlaylist: (playlist: Playlist) =>
    set({ likedPlaylists: [...get().likedPlaylists, playlist] }),
  removeLikedSong: (id: string) => {
    const { likedSongs } = get()
    const filteredLikedSongs = likedSongs.filter(song => song.id !== id)
    set({ likedSongs: filteredLikedSongs })
  },
  removeLikedPlaylist: (id: string) => {
    const { likedPlaylists } = get()
    const filteredLikedPlaylists = likedPlaylists.filter(
      playlist => playlist.id !== id
    )
    set({ likedPlaylists: filteredLikedPlaylists })
  },
  removePlaylist: (id: string) => {
    const { playlists } = get()
    const filteredPlaylists = playlists.filter(playlist => playlist.id !== id)
    set({ playlists: filteredPlaylists })
  },
  updatePlaylist: (updatedPlaylist: Playlist) => {
    const { playlists } = get()
    const updatedPlaylists = playlists.map(playlist => {
      if (playlist.id === updatedPlaylist.id) {
        return updatedPlaylist
      }
      return playlist
    })
    set({ playlists: updatedPlaylists })
  },
}))
