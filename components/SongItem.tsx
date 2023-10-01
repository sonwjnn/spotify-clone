'use client'

import useLoadImage from '@/hooks/useLoadImage'
import { Song } from '@/types'
import Image from 'next/image'
import PlayButton from './PlayButton'
import usePlayer from '@/stores/usePlayer'

interface SongItemProps {
	data: Song
	onClick: (id: string) => void
}

const SongItem: React.FC<SongItemProps> = ({ data, onClick }) => {
	const { currentSong, isPlaying } = usePlayer()

	const isPlayingCurrentSong = currentSong?.id === data.id && isPlaying
	const imagePath = useLoadImage(data.image_path, 'images')
	return (
		<div
			onClick={() => onClick(data.id)}
			className='relative flex flex-col group items-center justify-center rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10 transition p-4 mb-3'
		>
			<div className='relative aspect-square h-full w-full rounded-md overflow-hidden  shadow-[0_8px_24px_rgba(0,0,0,.5)]'>
				<Image
					className='
            object-cover
          '
					src={imagePath || '/image/liked.png'}
					fill
					alt='Img'
					sizes='100%'
					priority={true}
				/>
			</div>

			<div className='flex flex-col items-start w-full pt-4 gap-y-1'>
				<p className='truncate font-semibold w-full'>{data.title}</p>
				<p className='text-neutral-400 text-sm pb-4 w-full truncate'>
					By {data.author}
				</p>
			</div>
			<div className='absolute bottom-[102px] right-6 '>
				<PlayButton isPlaying={isPlayingCurrentSong} />
			</div>
		</div>
	)
}

export default SongItem
