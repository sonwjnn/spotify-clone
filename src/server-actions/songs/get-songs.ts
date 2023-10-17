import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

import type { Song } from '@/types/types'

export const getSongs = async (): Promise<Song[]> => {
  const supabase = createServerComponentClient({
    cookies,
  })

  const { data, error } = await supabase
    .from('songs')
    .select('*')
    .order('created_at', { ascending: true })
  if (error) {
    console.log(error)
  }

  return (data as any) || []
}
