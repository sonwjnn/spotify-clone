'use client'

import { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
interface SkeletonProviderProps {
	children: React.ReactNode
}

const SkeletonProvider: React.FC<SkeletonProviderProps> = ({ children }) => {
	return (
		<SkeletonTheme
			baseColor='#333'
			highlightColor='hsla(0,0%,100%,.1)'
		>
			{children}
		</SkeletonTheme>
	)
}

export default SkeletonProvider
