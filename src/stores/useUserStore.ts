import { Song, Playlist } from '@/types/types'
import { create } from 'zustand'

interface userStore {
  likedSongs: Song[]
  setLikedSongs: (songs: Song[]) => void
  likedPlaylists: Playlist[]
  setLikedPlaylists: (playlists: Playlist[]) => void
  removeLikedSong: (id: string) => void
  addLikedSong: (song: Song) => void
}

const useUserStore = create<userStore>()((set, get) => ({
  likedSongs: [],
  likedPlaylists: [],
  setLikedSongs: (songs: Song[]) => set({ likedSongs: songs }),
  setLikedPlaylists: (playlists: Playlist[]) =>
    set({ likedPlaylists: playlists }),
  removeLikedSong: (id: string) => {
    const { likedSongs } = get()
    const filteredLikedSongs = likedSongs.filter(song => song.id != id)
    set({ likedSongs: filteredLikedSongs })
  },
  addLikedSong: (song: Song) =>
    set({ likedSongs: [...get().likedSongs, song] }),
}))

export default useUserStore
