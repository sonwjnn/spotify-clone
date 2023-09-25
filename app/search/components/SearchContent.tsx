'use client'

import LikeButton from '@/components/LikeButton'
import MediaItem from '@/components/MediaItem'
import useOnPlay from '@/hooks/useOnPlay'
import { Song } from '@/types'

interface SearchContentProps {
	songs: Song[]
}

const SearchContent: React.FC<SearchContentProps> = ({ songs }) => {
	const onPlay = useOnPlay(songs)

	if (songs.length === 0) {
		return (
			<div className='flex flex-col gap-y-2 w-full px-6 text-neutral-400'>
				No songs found.
			</div>
		)
	}

	return (
		<>
			<div
				className={' w-full px-6 mb-4'}
			>
				<div
					className={`relative grid gap-4 search-layout-grid p-2  w-full   before:content-[""]  before:absolute before:h-[1px] before:w-full before:bg-neutral-800 before:bottom-0 `}
				>
					<div className='text-right text-neutral-400 '>#</div>
					<div className='
        flex
        item-center

        text-neutral-400
      '>
						Name
					</div>

					<div className='text-neutral-400 text-sm flex items-center justify-end'>
						Created at
					</div>
					<div className='text-neutral-400 text-sm flex items-center justify-end'>
						Duration
					</div>
					<div className='text-neutral-400 text-sm flex items-center justify-end'>
						Action
					</div>
				</div>
			</div>

			<div className='flex flex-col gap-y-6 w-full px-6 pb-2'>
				{songs.map((song, index) => (
					<div
						key={song.id}
						className='flex items-center gap-x-4 w-full'
					>
						<div className='flex-1'>
							<MediaItem
								onClick={(id: string) => onPlay(id)}
								className='grid gap-4 search-layout-grid'
								data={song}
								index={index + 1}
								isDuration={true}
								isCreatedAt={true}
							>
								<div className='flex justify-end'>
									<LikeButton songId={song.id} />
								</div>
							</MediaItem>
						</div>
					</div>
				))}
			</div>
		</>
	)
}

export default SearchContent
