import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

import type { Song } from '@/types/types'

import { getSongs } from '@/server-actions/songs/get-songs'

export const getSongsByTitle = async (title: string): Promise<Song[]> => {
  const supabase = createServerComponentClient({
    cookies,
  })

  if (!title) {
    const allSongs = await getSongs()
    return allSongs
  }

  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .ilike('title', `%${title}%`)
    .order('created_at', { ascending: false })
  if (error) {
    console.log(error)
  }

  return (data as any) || []
}
