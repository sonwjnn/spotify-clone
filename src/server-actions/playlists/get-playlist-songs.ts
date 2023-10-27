import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

import type { Song } from '@/types/types'

export const getPlaylistSongs = async (id: string): Promise<Song[]> => {
  const supabase = createServerComponentClient({
    cookies,
  })

  const { data } = await supabase
    .from('playlist_songs')
    .select('*, songs(*)')
    .eq('playlist_id', id)
    .order('created_at', { ascending: false })

  if (!data) return []

  return data.map(item => ({ ...item.songs }))
}
