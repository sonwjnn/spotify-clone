'use client'

import { Song } from '@/types'
import LikeButton from '../LikeButton'
import MediaItem from '../MediaItem'

interface LeftProps {
	song: Song
}

const Left: React.FC<LeftProps> = ({ song }) => {
	return (
		<div className='flex justify-center items-center gap-x-1 max-w-full md:max-w-[200px] lg:max-w-full pl-2'>
			<MediaItem data={song} />
			<LikeButton songId={song.id} size={22} />
		</div>
	)
}

export default Left
