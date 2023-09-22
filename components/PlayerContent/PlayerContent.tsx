'use client'

import { Song } from '@/types'
import Left from './Left'
import PlayerControl from './PlayerControl'
import Right from './Right'

interface PlayerContentProps {
	song: Song
	songUrl: string
}

const PlayerContent: React.FC<PlayerContentProps> = (
	{ songUrl, song },
) => {
	return (
		<div className='flex justify-between h-full'>
			<div className='flex w-[50%] md:w-[30%] justify-start '>
				<Left song={song} />
			</div>

			<PlayerControl song={song} songUrl={songUrl} />

			<div className='hidden md:flex w-[30%] justify-end  pr-2 '>
				<Right />
			</div>
		</div>
	)
}

export default PlayerContent
