'use client'

import { LibraryIcon } from '@/assets/icons'
import { AiOutlinePlus } from 'react-icons/ai'
import { useUser } from '@/hooks/useUser'
import useAuthModal from '@/hooks/useAuthModal'
import useUploadModal from '@/hooks/useUploadModal'
import { Song } from '@/types'
import MediaItem from './MediaItem'
import useOnPlay from '@/hooks/useOnPlay'
import useSubscribeModal from '@/hooks/useSubscribeModal'

interface LibraryProps {
	songs: Song[]
}

const Library: React.FC<LibraryProps> = ({ songs }) => {
	const { user, subscription } = useUser()
	const authModal = useAuthModal()
	const uploadModal = useUploadModal()
	const onPlay = useOnPlay(songs)

	const subcribeModal = useSubscribeModal()

	const onClick = () => {
		if (!user) {
			return authModal.onOpen()
		}
		if (!subscription) {
			return subcribeModal.onOpen()
		}

		return uploadModal.onOpen()
	}

	return (
		<div className='flex flex-col relative'>
			<div
				className={`flex items-center justify-between px-5 pt-4 sticky top-0 bg-neutral-900 z-10 pb-2`}
			>
				<div className='inline-flex items-center gap-x-2 '>
					<button className='text-neutral-400'>
						<LibraryIcon />
					</button>
					<p className='font-medium text-md text-neutral-400'>
						Your Library
					</p>
				</div>

				<div
					className={'min-h-8  flex flex-row justify-end'}
				>
					<div
						className={'w-8 h-8 rounded-full transition relative hover:bg-neutral-800'}
					>
						<button
							className='absolute flex items-center justify-center  right-[1px] border-none outline-none focus:outline-none cursor-pointer w-full h-full bg-transparent text-neutral-400 hover:text-white transition'
							onClick={onClick}
						>
							<AiOutlinePlus size={20} />
						</button>
					</div>
				</div>
			</div>
			<div className='flex flex-col gap-y-2 mt-2 px-3 '>
				{songs.map((item) => (
					<MediaItem
						onClick={(id: string) => onPlay(id)}
						key={item.id}
						data={item}
					/>
				))}
			</div>
		</div>
	)
}

export default Library
