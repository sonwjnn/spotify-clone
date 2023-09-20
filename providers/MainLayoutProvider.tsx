import useComponentSize from '@/hooks/useComponentSize'
import React, { FC, useEffect, useRef } from 'react'
import useMainLayout from '@/stores/useMainLayout'

interface MainLayoutProviderProps {
	children: React.ReactNode
}

export const MainLayoutProvider: FC<MainLayoutProviderProps> = (
	{ children },
) => {
	const { setQuantityCol, setWidth } = useMainLayout()
	const mainRef = useRef<HTMLDivElement>(null)

	const size = useComponentSize(mainRef)

	useEffect(() => {
		if (size.width < 340) setQuantityCol(1)
		else if (size.width < 548) setQuantityCol(2)
		else if (size.width < 748) setQuantityCol(3)
		else if (size.width < 995) setQuantityCol(4)
		else if (size.width < 1248) setQuantityCol(5)
		else if (size.width < 1448) setQuantityCol(6)
		else if (size.width < 1648) setQuantityCol(7)
		else if (size.width < 1868) setQuantityCol(8)
		else setQuantityCol(9)

		setWidth(size.width)
	}, [size.width])

	return (
		<div className='flex-grow' ref={mainRef}>
			{children}
		</div>
	)
}
