import { useSessionContext } from '@supabase/auth-helpers-react'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-hot-toast'

import type { UserDetails } from '@/types/types'

export const useGetUserById = (
  id?: string
): {
  isLoading: boolean
  user: UserDetails | undefined
} => {
  const [user, setUser] = useState<UserDetails | undefined>(undefined)

  const [isLoading, setIsLoading] = useState(false)

  const { supabaseClient } = useSessionContext()

  useEffect(() => {
    if (!id) return

    setIsLoading(true)

    const fetchData = async (): Promise<void> => {
      const { data, error } = await supabaseClient
        .from('users')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        setIsLoading(false)
        toast.error(error.message)
        return
      }
      setUser(data as UserDetails)
      setIsLoading(false)
    }
    fetchData()
  }, [id, supabaseClient])

  return useMemo(
    () => ({
      isLoading,
      user,
    }),
    [isLoading, user]
  )
}
