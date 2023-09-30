'use client'

import useLoadImage from '@/hooks/useLoadImage'
import useLoadSongUrl from '@/hooks/useLoadSongUrl'
import { Song } from '@/types'
import durationConvertor from '@/utils/durationConvertor'
import Image from 'next/image'
import useSound from 'use-sound'
import dayjs from 'dayjs'
import { twMerge } from 'tailwind-merge'
import useMainLayout from '@/stores/useMainLayout'
import usePlayer from '@/stores/usePlayer'

interface MediaItemProps {
	data: Song
	index?: number
	isDuration?: boolean
	isCreatedAt?: boolean
	selected?: string
	className?: string
	onDoubleClick?: (id: string) => void
	onClick?: (id: string) => void
	children?: React.ReactNode
}

const MediaItem: React.FC<MediaItemProps> = (
	{
		data,
		className,
		isDuration = false,
		isCreatedAt = false,
		index,
		selected,
		onClick,
		children,
	},
) => {
	const { width } = useMainLayout()
	const imageUrl = useLoadImage(data.image_path, 'images')
	const songUrl = useLoadSongUrl(data!)
	const [play, { duration }] = useSound(songUrl, { format: ['mp3'] })
	const player = usePlayer()

	const handleClick = () => {
		if (onClick) {
			return onClick(data.id)
		}

		return
	}

	const isTextColorChange = player.activeId === data.id && selected

	return (
		<div
			className={twMerge(
				`transition cursor-pointer rounded-md p-2 w-full hover:bg-neutral-800/50 ${
					selected === data.id && 'bg-neutral-800/50'
				}`,
				className,
			)}
		>
			{index && (
				<div
					className={`${
						isTextColorChange &&
						'text-[#1ed760]'
					} text-neutral-400 text-sm flex items-center  justify-end w-4 mr-2`}
				>
					{index}
				</div>
			)}
			<div
				onClick={handleClick}
				className='
        flex
        item-center
        gap-x-3
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
					<p
						className={`${
							isTextColorChange &&
							'text-[#1ed760]'
						} hover:underline text-white truncate`}
					>
						{data.title}
					</p>
					<p className='text-neutral-400 text-sm truncate'>
						{data.author}
					</p>
				</div>
			</div>

			{isCreatedAt && (
				<div
					className={`${
						width <= 780 ? 'hidden' : 'flex'
					} text-neutral-400 text-sm items-center justify-end`}
				>
					{dayjs(data.created_at).format('DD-MM-YYYY')}
				</div>
			)}

			{isDuration && (
				<div
					className={`${
						width <= 550 ? 'hidden' : 'flex'
					} text-neutral-400 text-sm items-center justify-end`}
				>
					{durationConvertor({
						milliseconds: duration ? duration : 0,
					})}
				</div>
			)}

			{children}
		</div>
	)
}

export default MediaItem
