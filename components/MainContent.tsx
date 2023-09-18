'use client'

import usePlayer from '@/hooks/usePlayer'
import Split from 'react-split'
import { twMerge } from 'tailwind-merge'
import Sidebar from './Sidebar'
import { Song } from '@/types'
import { useAppSelector } from '@/redux/hooks'
import PlayingView from './PlayingView/PlayingView'

interface MainContentProps {
	children: React.ReactNode
	songs: Song[]
}

const MainContent: React.FC<MainContentProps> = ({ children, songs }) => {
	const player = usePlayer()
	const { isPlayingViewShowed } = useAppSelector((state) => state.playingView)

	return (
		<Split
			cursor='col-resize'
			minSize={isPlayingViewShowed ? [300, 400, 0] : [280, 600]}
			maxSize={isPlayingViewShowed ? [500, 99999, 400] : [500, 99999]}
			sizes={isPlayingViewShowed ? [20, 60, 20] : [20, 80]}
			gutterSize={8}
			snapOffset={20}
			className={twMerge(
				`flex flex-grow w-full h-full`,
				player.activeId && 'h-[calc(100%-80px)]',
			)}
		>
			<Sidebar songs={songs} />
			<main className='h-full flex-1 overflow-y-auto py-2'>
				{children}
			</main>
			{isPlayingViewShowed
				? <PlayingView />
				: <div style={{ marginRight: '-8px' }}></div>}
		</Split>
	)
}

export default MainContent
