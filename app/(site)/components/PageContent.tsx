'use client'

import SongItem from '@/components/SongItem'
import useOnPlay from '@/hooks/useOnPlay'
import useMainLayout from '@/stores/useMainLayout'
import { Song } from '@/types'
import { useEffect } from 'react'

interface PageContentProps {
	songs: Song[]
}

const PageContent: React.FC<PageContentProps> = ({ songs }) => {
	useEffect(() => {
		useMainLayout.persist.rehydrate()
	}, [])

	const onPlay = useOnPlay(songs)
	const { width, quantityCol } = useMainLayout()

	const columnWidth = (width - 2 * 24 - (quantityCol - 1) * 24) / quantityCol

	if (songs.length === 0) {
		return <div className='mt-4 text-neutral-400'>No songs avalable.</div>
	}

	return (
		<div
			className={` gap-4 mt-4 grid `}
			style={{
				gridTemplateColumns: `repeat(${quantityCol}, minmax(0,1fr))`,
				columnWidth: columnWidth,
			}}
		>
			{songs.map((item) => (
				<SongItem
					key={item.id}
					onClick={(id: string) => onPlay(id)}
					data={item}
				/>
			))}
		</div>
	)
}

export default PageContent
