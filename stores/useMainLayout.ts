import { create } from 'zustand'

interface mainLayoutStore {
	quantityCol: number
	width: number
	height: number
	setQuantityCol: (cols: number) => void
	setWidth: (width: number) => void
}

const useMainLayout = create<mainLayoutStore>((set) => ({
	quantityCol: 4,
	width: 0,
	height: 0,
	setQuantityCol: (quantityCol: number) => set({ quantityCol }),
	setWidth: (width: number) => set({ width }),
}))

export default useMainLayout
