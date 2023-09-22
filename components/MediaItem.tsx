import useLoadImage from '@/hooks/useLoadImage'
import useLoadSongUrl from '@/hooks/useLoadSongUrl'
import { Song } from '@/types'
import durationConvertor from '@/utils/durationConvertor'
import Image from 'next/image'
import useSound from 'use-sound'

interface MediaItemProps {
	data: Song
	isDisplayDuration?: boolean
	onClick?: (id: string) => void
}

const MediaItem: React.FC<MediaItemProps> = (
	{ data, isDisplayDuration = false, onClick },
) => {
	const imageUrl = useLoadImage(data)
	const songUrl = useLoadSongUrl(data!)
	const [play, { duration }] = useSound(songUrl, { format: ['mp3'] })

	const handleClick = () => {
		if (onClick) {
			return onClick(data.id)
		}

		return
	}

	return (
		<div className='flex items-center justify-between cursor-pointer rounded-md p-2 w-full hover:bg-neutral-800/50'>
			<div
				onClick={handleClick}
				className='
        flex
        item-center
        gap-x-3
        w-full
      '
			>
				<div className='
          relative
          rounded-md
          min-h-[48px]
          min-w-[48px]
          overflow-hidden
        '>
					<Image
						fill
						src={imageUrl || '/images/liked.png'}
						sizes='100%'
						alt='Media-Item'
						className='object-cover'
					/>
				</div>
				<div className='
          flex
          flex-col
          gap-y-1
          overflow-hidden
      '>
					<p className='text-white truncate'>
						{data.title}
					</p>
					<p className='text-neutral-400 text-sm truncate'>
						{data.author}
					</p>
				</div>
			</div>
			{isDisplayDuration && (
				<div className='text-neutral-400 text-sm'>
					{durationConvertor({
						milliseconds: duration ? duration : 0,
					})}
				</div>
			)}
		</div>
	)
}

export default MediaItem
