import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

import type { Playlist } from '@/types/types'

export const getOtherUserPlaylists = async (
  id: string
): Promise<Playlist[]> => {
  const supabase = createServerComponentClient({
    cookies,
  })

  if (!id) {
    return []
  }

  const { data, error } = await supabase
    .from('playlists')
    .select('*')
    .eq('user_id', id)
    .order('created_at', { ascending: false })

  if (error) {
    console.log(error)
  }

  return (data as any) || []
}
