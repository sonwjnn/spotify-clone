'use client'

import { SearchIcon } from '@/assets/icons'
import Input from '@/components/Input'
import LikeButton from '@/components/LikeButton'
import MediaItem from '@/components/MediaItem'
import PlaylistButton from '@/components/PlaylistButton'
import useDebounce from '@/hooks/useDebounce'
import useOnPlay from '@/hooks/useOnPlay'
import useMainLayout from '@/stores/useMainLayout'
import { Playlist, Song } from '@/types'
import { useSessionContext } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'

interface PlaylistSearchProps {
	songs: Song[]
	playlist: Playlist
}

const PlaylistSearch: React.FC<PlaylistSearchProps> = ({ playlist }) => {
	const { width } = useMainLayout()

	const { supabaseClient } = useSessionContext()

	const [value, setValue] = useState<string>('')
	const [songs, setSongs] = useState<Song[]>([])
	const debouncedValue = useDebounce<string>(value, 500)
	const onPlay = useOnPlay(songs)

	useEffect(() => {
		const fetchDataByTitle = async () => {
			if (!debouncedValue) {
				setSongs([])
				return
			}
			const { data, error } = await supabaseClient
				.from('songs')
				.select('*')
				.ilike('title', `%${debouncedValue}%`)
				.order('created_at', { ascending: false })
			if (error) {
				console.log(error)
			}
			if (data) {
				const unaddedSongs = data.filter((song) =>
					!playlist?.song_ids?.includes(song.id)
				)
				setSongs(unaddedSongs as Song[])
			}
		}

		fetchDataByTitle()
	}, [debouncedValue, supabaseClient])

	return (
		<>
			<div className='px-6 mb-4'>
				<div className='relative text-white text-3xl mt-2 font-semibold py-6 before:content-[""]  before:absolute before:h-[1px] before:w-full before:bg-neutral-800 before:top-0  before:left-0 truncate'>
					Lets find content for your playlist !
				</div>
				<Input
					placeholder={'Search for your song to want to listen to !'}
					value={value}
					onChange={(e) => setValue(e.target.value)}
					className={`rounded-full px-4 pl-10 bg-neutral-800 w-[40%] ${
						width <= 780 && 'w-[60%]'
					} ${width <= 550 && 'w-full'}`}
					startIcon={<SearchIcon size={18} />}
				/>
			</div>

			<div className='flex flex-col gap-y-6 w-full px-6 pb-2 min-h-[70vh]'>
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
									className={`flex items-center justify-end`}
								>
									<PlaylistButton
										type='add'
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
