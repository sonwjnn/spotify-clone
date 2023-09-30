'use client'

import { LibraryIcon } from '@/assets/icons'

import UploadDropdown from './UploadDropdown'
import Playlist from './Playlist'

interface LibraryProps {
	playlists: Playlist[]
	isScroll?: boolean
}

const Library: React.FC<LibraryProps> = ({ playlists, isScroll = false }) => {
	return (
		<div className='flex flex-col'>
			<div
				className={`flex flex-col items-center px-5 pt-4 sticky top-0 bg-neutral-900 z-10 pb-0 ${
					isScroll ? 'shadow-2xl' : ''
				}`}
			>
				<div className='w-full flex items-center justify-between'>
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
						<UploadDropdown />
					</div>
				</div>

				<div className='h-12 w-full flex items-center gap-x-2 mt-2'>
					<button className=' rounded-full bg-neutral-800 text-white text-sm border border-transparent py-1 px-3 disabled:cursor-not-allowed disabled:opacity-50 transition hover:brightness-110'>
						Playlists
					</button>
					<button
						disabled
						className=' rounded-full bg-neutral-800 text-white text-sm border border-transparent py-1 px-3 disabled:select-none  disabled:opacity-50 transition hover:brightness-110'
					>
						Albums
					</button>
				</div>
			</div>
			<Playlist data={playlists} />
		</div>
	)
}

export default Library
