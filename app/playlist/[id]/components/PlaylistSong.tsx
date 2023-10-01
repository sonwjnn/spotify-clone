'use client'

import LikeButton from '@/components/LikeButton'
import MediaDropdown from '@/components/MediaDropdown'
import MediaItem from '@/components/MediaItem'
import PlayButton from '@/components/PlayButton'
import useOnPlay from '@/hooks/useOnPlay'
import useClickOutside from '@/hooks/useClickOutside'
import useMainLayout from '@/stores/useMainLayout'
import usePlayer from '@/stores/usePlayer'
import { Playlist, Song } from '@/types'
import { useEffect, useRef, useState } from 'react'

interface PlaylistSongProps {
	songs: Song[]
	playlist: Playlist
}

const PlaylistSong: React.FC<PlaylistSongProps> = ({ songs, playlist }) => {
	const onPlay = useOnPlay(songs)
	const player = usePlayer()
	const { width } = useMainLayout()
	const [selected, setSelected] = useState<string>('')
	const [actived, setActived] = useState<string>('')
	const [isPlaying, setPlaying] = useState(false)

	const wrapperRef = useRef(null)
	useClickOutside(wrapperRef, () => {
		setSelected('')
	})

	useEffect(() => {
		if (player.activeId) {
			setActived(player.activeId)
		}
	}, [player.activeId])

	useEffect(() => {
		setPlaying(player.isPlaying)
	}, [player.isPlaying])

	const handleClickPlay = () => {
		// player.reset()
		// player.setPlaying(!player.isPlaying)
		onPlay(songs[0].id)
	}

	return (
		<div
			className='flex flex-col gap-y-6 w-full px-6 pb-2 min-h-[20vh]'
			ref={wrapperRef}
		>
			{songs.length
				? (
					<>
						<div className='h-14 w-full flex gap-x-2'>
							<PlayButton
								className='opacity-1 translate-y-0 w-14'
								onClick={handleClickPlay}
								isPlaying={isPlaying}
							/>
							{/* <MediaDropdown /> */}
						</div>
						<div
							className={`relative grid gap-4 search-layout-grid ${
								width <= 550 && 'search-layout-grid-sm'
							} ${
								width <= 780 && 'search-layout-grid-md'
							} p-2 w-full before:content-[""] before:absolute before:h-[1px] before:w-full before:bg-neutral-800 before:bottom-0 text-neutral-400 text-sm`}
						>
							<div className='text-right text-neutral-400'>
								#
							</div>
							<div className='flex item-center text-neutral-400'>
								Name
							</div>

							<div
								className={`${
									width <= 780 ? 'hidden' : 'flex'
								} items-center justify-end`}
							>
								Created at
							</div>
							<div
								className={`${
									width <= 550 ? 'hidden' : 'flex'
								} items-center justify-end`}
							>
								Duration
							</div>
							<div
								className={`${
									width <= 440 ? 'hidden' : 'flex'
								} flex items-center justify-end`}
							>
								Action
							</div>
						</div>
					</>
				)
				: null}
			{songs.map((song, index) => (
				<div
					key={song.id}
					className='flex items-center gap-x-4 w-full'
				>
					<div
						className='flex-1'
						onClick={() => setSelected(song.id)}
						onDoubleClick={() => onPlay(song.id)}
					>
						<MediaItem
							className={`group/media grid gap-4 search-layout-grid ${
								width <= 550 && 'search-layout-grid-sm'
							} ${width <= 780 && 'search-layout-grid-md'} ${
								width <= 440 && 'search-layout-grid-se'
							} `}
							isPlaying={isPlaying}
							actived={actived}
							selected={selected}
							data={song}
							index={index + 1}
							isDuration={true}
							isCreatedAt={true}
						>
							<div
								className={`flex justify-end items-center`}
							>
								<LikeButton
									selected={selected}
									className=' mr-4 '
									songId={song.id}
								/>
								<MediaDropdown
									songId={song.id}
									playlistId={playlist.id}
								/>
							</div>
						</MediaItem>
					</div>
				</div>
			))}
		</div>
	)
}

export default PlaylistSong
