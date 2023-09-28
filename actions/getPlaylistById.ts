import { Playlist } from '@/types'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

const getPlaylistById = async (id: string): Promise<Playlist | null> => {
	const supabase = createServerComponentClient({
		cookies: cookies,
	})

	if (!id) {
		return null
	}

	const { data, error } = await supabase
		.from('playlists')
		.select('*')
		.eq('id', id)
		.order('created_at', { ascending: false })
		.single()

	if (error) {
		console.log(error)
	}

	return (data as any) || null
}

export default getPlaylistById
