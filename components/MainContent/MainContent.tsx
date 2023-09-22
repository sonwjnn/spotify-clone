'use client'

import Split from 'react-split'
import { twMerge } from 'tailwind-merge'
import Sidebar from '../Sidebar'
import { Song } from '@/types'
import PlayingView from '../PlayingView/PlayingView'

import usePlayingView from '@/stores/usePlayingView'
import usePlayer from '@/stores/usePlayer'
import { useEffect, useState } from 'react'
import GlobalLoading from '../LoadingLayout/GlobalLoading'
import MainLayout from './MainLayout'

interface MainContentProps {
	children: React.ReactNode
	songs: Song[]
}

const MainContent: React.FC<MainContentProps> = ({ children, songs }) => {
	const [isLoading, setLoading] = useState(true)
	const player = usePlayer()

	const { isShowed } = usePlayingView()

	useEffect(() => {
		setTimeout(() => {
			setLoading(false)
		}, 500)
	}, [])

	return (
		<>
			{isLoading ? <GlobalLoading /> : (
				<Split
					cursor='col-resize'
					minSize={isShowed ? [300, 400, 0] : [280, 600]}
					maxSize={isShowed ? [500, 99999, 400] : [500, 99999]}
					sizes={isShowed ? [20, 60, 20] : [20, 80]}
					gutterSize={8}
					snapOffset={20}
					className={twMerge(
						`flex flex-row w-full h-full `,
						player.activeId && 'h-[calc(100%-80px)]',
					)}
				>
					<Sidebar
						className='min-w-[280px] max-w-[500px]'
						songs={songs}
					/>

					<MainLayout>
						<main className='h-full flex-grow overflow-y-auto py-2 '>
							{children}
						</main>
					</MainLayout>

					{isShowed
						? <PlayingView />
						: <div className='w-2 absolute right-0 h-full'></div>}
				</Split>
			)}
		</>
	)
}

export default MainContent
