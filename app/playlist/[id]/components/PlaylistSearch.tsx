'use client'

import LikeButton from '@/components/LikeButton'
import MediaItem from '@/components/MediaItem'
import PlaylistButton from '@/components/PlaylistButton'
import SearchInput from '@/components/SearchInput'
import useOnPlay from '@/hooks/useOnPlay'
import useMainLayout from '@/stores/useMainLayout'
import { Playlist, Song } from '@/types'

interface PlaylistSearchProps {
	songs: Song[]
	playlist: Playlist
}

const PlaylistSearch: React.FC<PlaylistSearchProps> = ({ songs, playlist }) => {
	const onPlay = useOnPlay(songs)
	const { width } = useMainLayout()

	return (
		<>
			<div className='px-6 mb-4'>
				<div className='relative text-white text-3xl mt-2 font-semibold py-6 before:content-[""]  before:absolute before:h-[1px] before:w-full before:bg-neutral-800 before:top-0  before:left-0 truncate'>
					Lets find content for your playlist !
				</div>
				<SearchInput
					className={`w-[40%] ${width <= 780 && 'w-[60%]'} ${
						width <= 550 && 'w-full'
					}`}
					url={`/playlist/${playlist.id}`}
				/>
			</div>

			<div className='flex flex-col gap-y-6 w-full px-6 pb-2 min-h-[80vh]'>
				{songs.map((song, index) => (
					<div
						key={song.id}
						className='flex items-center gap-x-4 w-full '
					>
						<div className='flex-1'>
							<MediaItem
								onClick={(id: string) => onPlay(id)}
								className={`grid gap-4 search-layout-grid ${
									width <= 550 && 'search-layout-grid-sm'
								} ${width <= 780 && 'search-layout-grid-md'} ${
									width <= 440 && 'search-layout-grid-se'
								}`}
								data={song}
								index={index + 1}
								isDuration={true}
								isCreatedAt={true}
							>
								<div
									className={`${
										width <= 440 ? 'hidden' : 'flex'
									} flex justify-end`}
								>
									<PlaylistButton
										songId={song.id}
										playlistId={playlist.id}
									/>
								</div>
							</MediaItem>
						</div>
					</div>
				))}
			</div>
		</>
	)
}

export default PlaylistSearch
