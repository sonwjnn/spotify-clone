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
  bgBase: "#171717",
  bgColor: "#171717",
  hasBgImage: false,
  setHasBgImage: (hasBgImage: boolean) => set({ hasBgImage }),
  setBgColor: (bgColor: string) => set({ bgColor }),
  setBgBase: (bgBase: string) => set({ bgBase }),
}));

export default useHeaderColor;
