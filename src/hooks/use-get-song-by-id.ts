import { useSessionContext } from '@supabase/auth-helpers-react'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-hot-toast'

import type { Song } from '@/types/types'

const useGetSongById = (
  id?: string
): {
  isLoading: boolean
  song: Song | undefined
} => {
  const [song, setSong] = useState<Song | undefined>(undefined)

  const [isLoading, setIsLoading] = useState(false)

  const { supabaseClient } = useSessionContext()

  useEffect(() => {
    if (!id) return

    setIsLoading(true)

    const fetchData = async (): Promise<void> => {
      const { data, error } = await supabaseClient
        .from('songs')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        setIsLoading(false)
        toast.error(error.message)
        return
      }
      setSong(data as Song)
      setIsLoading(false)
    }
    fetchData()
  }, [id, supabaseClient])

  return useMemo(
    () => ({
      isLoading,
      song,
    }),
    [isLoading, song]
  )
}

export default useGetSongById
