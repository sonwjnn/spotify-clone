import { create } from "zustand";

interface NavOpacityStore {
  opacity: number;
  setOpacity: (opacity: number) => void;
}

const useNavOpacity = create<NavOpacityStore>()((set) => ({
  opacity: 0,
  setOpacity: (opacity: number) => set({ opacity }),
}));

export default useNavOpacity;
