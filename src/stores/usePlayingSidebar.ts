import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface playingSidebarProps {
  isShowed: boolean;
  setShowed: (isShowed: boolean) => void;
}

const usePlayingSidebar = create<playingSidebarProps>()(
  persist(
    (set) => ({
      isShowed: false,
      setShowed: (isShowed: boolean) => set({ isShowed }),
    }),
    {
      name: "playing-view-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default usePlayingSidebar;
