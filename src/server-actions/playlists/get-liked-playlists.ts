import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

import type { Playlist } from '@/types/types'

export const getLikedPlaylists = async (): Promise<Playlist[]> => {
  const supabase = createServerComponentClient({
    cookies,
  })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const { error, data } = await supabase
    .from('liked_playlists')
    .select('*,  playlists(*, users!playlists_user_id_fkey(*))')
    .eq('user_id', session?.user.id)
    .order('created_at', { ascending: false })

  if (error) console.log(error)
  if (!data) return []

  return data.map(item => ({
    ...item.playlists,
  }))
}
