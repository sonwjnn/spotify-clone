import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

import type { Song } from '@/types/types'

export const getPlaylists = async (): Promise<Song[]> => {
  const supabase = createServerComponentClient({
    cookies,
  })

  const { data, error } = await supabase
    .from('playlists')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) {
    console.log(error)
  }

  return (data as any) || []
}
