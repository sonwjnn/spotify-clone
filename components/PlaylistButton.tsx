'use client'
import { useUser } from '@/hooks/useUser'
import { useSessionContext } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import useAuthModal from '@/hooks/useAuthModal'
import { toast } from 'react-hot-toast'

interface PlaylistButtonProps {
	songId: string
	playlistId: string
}

const PlaylistButton: React.FC<PlaylistButtonProps> = (
	{ songId, playlistId },
) => {
	const router = useRouter()

	const { supabaseClient } = useSessionContext()

	const { user } = useUser()

	const authModal = useAuthModal()

	const [isAdded, setIsAdded] = useState<boolean>(false)

	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		const { data, error } = await supabaseClient
	// 			.from('liked_songs')
	// 			.select('*')
	// 			.eq('user_id', user?.id)
	// 			.eq('song_id', songId)
	// 			.single()
	//
	// 		if (!error && data) {
	// 			setIsAdded(true)
	// 		} else {
	// 			setIsAdded(false)
	// 		}
	// 	}
	//
	// 	fetchData()
	// }, [songId, supabaseClient, user?.id])

	const handleLike = async () => {
		if (!user) return authModal.onOpen()

		// const { data, error } = await supabaseClient
		// 	.from('playlists')
		// 	.delete()
		// 	.eq('id', playlistId)
		// 	.eq('song_ids', songId)
		//
		// if (error) return toast.error(error.message)
		// setIsAdded(false)
		const { data, error: playlistError } = await supabaseClient
			.from('playlists')
			.select('*')
			.eq('id', playlistId)
			.single()
		if (playlistError) return toast.error(playlistError.message)

		const song_ids = data.song_ids || []

		const { error } = await supabaseClient
			.from('playlists')
			.upsert({
				id: playlistId,
				song_ids: [...song_ids, songId],
				user_id: user.id,
			})

		if (error) return toast.error(error.message)

		setIsAdded(true)

		toast.success('Added song to your playlist!')
		router.refresh()
	}

	return (
		<button
			onClick={handleLike}
			className={`w-[50px] rounded-full border border-white px-2 py-2 disabled:cursor-not-allowed disabled:opacity-50  font-semibold transition hover:scale-105 active:scale-100 bg-transparent text-white
`}
		>
			Add
		</button>
	)
}

export default PlaylistButton
