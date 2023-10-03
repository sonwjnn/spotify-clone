import { Song } from "@/types";
import { create } from "zustand";

interface userStore {
  likedSongs: Song[];
  setLikedSongs: (songs: Song[]) => void;
}

const useUserStore = create<userStore>()((set) => ({
  likedSongs: [],
  setLikedSongs: (songs: Song[]) => set({ likedSongs: songs }),
}));

export default useUserStore;
