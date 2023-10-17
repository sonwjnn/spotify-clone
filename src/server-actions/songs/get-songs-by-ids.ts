import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

import type { Song } from '@/types/types'

export const getSongsByIds = async (ids: string[]): Promise<Song[]> => {
  const supabase = createServerComponentClient({
    cookies,
  })

  if (!ids.length) {
    return []
  }

  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .in('id', ids)
    .order('created_at', { ascending: false })

  if (error) {
    console.log(error)
  }

  return (data as any) || []
}
