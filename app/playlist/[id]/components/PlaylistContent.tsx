'use client'

import { Playlist, Song } from '@/types'
import PlaylistSearch from './PlaylistSearch'
import PlaylistSong from './PlaylistSong'

interface PlaylistContentProps {
	playlist: Playlist
	songs: Song[]
}

const PlaylistContent: React.FC<PlaylistContentProps> = (
	{ playlist, songs },
) => {
	const addedSongs = songs.filter((song) =>
		playlist?.song_ids?.includes(song.id)
	)
	const unaddedSongs = songs.filter((song) =>
		!playlist?.song_ids?.includes(song.id)
	)

	return (
		<>
			<PlaylistSong songs={addedSongs} />
			<PlaylistSearch songs={unaddedSongs} playlist={playlist} />
		</>
	)
}

export default PlaylistContent
