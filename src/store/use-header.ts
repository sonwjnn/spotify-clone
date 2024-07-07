import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type HeaderStore = {
  bgBase: string
  bgColor: string
  hasBgImage: boolean
  width: number
  height: number
  setHeight: (height: number) => void
  setHasBgImage: (isBgImage: boolean) => void
  setBgColor: (bgColor: string) => void
  setBgBase: (bgColor: string) => void
}

export const useHeader = create<HeaderStore>()(
  persist(
    set => ({
      bgBase: '#3f3f46',
      bgColor: '#3f3f46',
      hasBgImage: true,
      width: 0,
      height: 0,
      setHeight: (height: number) => set({ height }),
      setHasBgImage: (hasBgImage: boolean) => set({ hasBgImage }),
      setBgColor: (bgColor: string) => set({ bgColor }),
      setBgBase: (bgBase: string) => set({ bgBase }),
    }),
    {
      name: 'header-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)
