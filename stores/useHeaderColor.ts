import { create } from "zustand";

interface HeaderColorStore {
  bgBase: string;
  bgColor: string;
  hasBgImage: boolean;
  setHasBgImage: (isBgImage: boolean) => void;
  setBgColor: (bgColor: string) => void;
  setBgBase: (bgColor: string) => void;
}

const useHeaderColor = create<HeaderColorStore>()((set) => ({
  bgBase: "#3f3f46",
  bgColor: "#3f3f46",
  hasBgImage: true,
  setHasBgImage: (hasBgImage: boolean) => set({ hasBgImage }),
  setBgColor: (bgColor: string) => set({ bgColor }),
  setBgBase: (bgBase: string) => set({ bgBase }),
}));

export default useHeaderColor;
