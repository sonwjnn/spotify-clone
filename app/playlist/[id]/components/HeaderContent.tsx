'use client'

import { MusicNote } from '@/assets/icons'
import useAuthModal from '@/hooks/useAuthModal'
import useLoadImage from '@/hooks/useLoadImage'
import usePlaylistModal from '@/hooks/usePlaylistModal'
import useSubscribeModal from '@/hooks/useSubscribeModal'
import { useUser } from '@/hooks/useUser'
import { Playlist } from '@/types'
import Image from 'next/image'

interface HeaderContentProps {
	data: Playlist | null
	id: string
}
const HeaderContent: React.FC<HeaderContentProps> = ({ id, data }) => {
	const { user, subscription } = useUser()
	const authModal = useAuthModal()
	const uploadModal = usePlaylistModal()

	const subcribeModal = useSubscribeModal()

	const imagePath = useLoadImage(data?.image_path!, 'images')

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
		<div className='flex flex-col md:flex-row items-center gap-x-5'>
			<div
				className={'h-32 w-32 lg:h-[232px] lg:w-[232px] text-white bg-[#282828] rounded-sm flex items-center justify-center shadow-[0_8px_24px_rgba(0,0,0,.5)]'}
			>
				{imagePath
					? (
						<div className='relative aspect-square h-full w-full rounded-sm overflow-hidden'>
							<Image
								className='
            object-cover
          '
								src={imagePath}
								fill
								alt='Img'
								sizes='100%'
							/>
						</div>
					)
					: <MusicNote size={50} />}
			</div>
			<div className='flex flex-col gap-y-2 mt-4 md:mt-0'>
				<p className='hidden md:block font-semibold text-sm'>
					Playlist
				</p>
				<h1
					onClick={onClick}
					className='text-white text-4xl sm:text-5xl lg:text-7xl font-bold cursor-pointer'
				>
					{data?.title || 'Playlist Title'}
				</h1>
			</div>
		</div>
	)
}

export default HeaderContent
