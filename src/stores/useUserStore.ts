import { Song, Playlist } from "@/types/types";
import { create } from "zustand";

interface userStore {
  likedSongs: Song[];
  setLikedSongs: (songs: Song[]) => void;
  likedPlaylists: Playlist[];
  setLikedPlaylists: (playlists: Playlist[]) => void;
}

const useUserStore = create<userStore>()((set) => ({
  likedSongs: [],
  likedPlaylists: [],
  setLikedSongs: (songs: Song[]) => set({ likedSongs: songs }),
  setLikedPlaylists: (playlists: Playlist[]) =>
    set({ likedPlaylists: playlists }),
}));

export default useUserStore;
