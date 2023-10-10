import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface mainLayoutStore {
  quantityCol: number
  width: number
  height: number
  setQuantityCol: (cols: number) => void
  setWidth: (width: number) => void
}

const useMainLayout = create<mainLayoutStore>()(
  persist(
    set => ({
      quantityCol: 4,
      width: 0,
      height: 0,
      setQuantityCol: (quantityCol: number) => set({ quantityCol }),
      setWidth: (width: number) => set({ width }),
    }),
    {
      name: 'main-layout-storage',
      storage: createJSONStorage(() => sessionStorage),
      skipHydration: true,
    }
  )
)

export default useMainLayout
