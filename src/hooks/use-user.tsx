'use client'

import type { User } from '@supabase/auth-helpers-react'
import {
  useSessionContext,
  useUser as useSupaUser,
} from '@supabase/auth-helpers-react'
import { createContext, useContext, useEffect, useState } from 'react'

import type { Subscription, UserDetails } from '@/types/types'

import { useUserStore } from '@/store/use-user-store'

type UserContextType = {
  accessToken: string | null
  user: User | null
  userDetails: UserDetails | null
  isLoading: boolean
  subscription: Subscription | null
}

export const UserContext = createContext<UserContextType | undefined>(undefined)
export type Props = {
  [propName: string]: any
}

export const MyUserContextProvider = (props: Props) => {
  const {
    session,
    isLoading: isLoadingUser,
    supabaseClient: supabase,
  } = useSessionContext()
  const user = useSupaUser()
  const { userDetails, setUserDetails } = useUserStore()

  const accessToken = session?.access_token ?? null
  const [isLoadingData, setIsLoadingData] = useState(false)
  const [subscription, setSubscription] = useState<Subscription | null>(null)

  const getUserDetails = (): any => {
    const data = supabase.from('users').select('*').single()
    return data
  }

  const getSubscription = (): any => {
    const data = supabase
      .from('subscriptions')
      .select('*, prices(*, products(*))')
      .in('status', ['trialing', 'active'])
      .single()

    return data
  }

  useEffect(() => {
    if (!isLoadingData && !userDetails && !subscription) {
      setIsLoadingData(true)
      Promise.allSettled([getUserDetails(), getSubscription()]).then(
        results => {
          const userDetailsPromise = results[0]
          const subscriptionPromise = results[1]

          if (userDetailsPromise.status === 'fulfilled') {
            setUserDetails(userDetailsPromise.value.data as UserDetails)
          }

          if (subscriptionPromise.status === 'fulfilled') {
            setSubscription(subscriptionPromise.value.data as Subscription)
          }

          setIsLoadingData(false)
        }
      )
    } else if (!user && !isLoadingUser && !isLoadingData) {
      setUserDetails(null)
      setSubscription(null)
    }
  }, [user, isLoadingUser])

  const value = {
    accessToken,
    user,
    userDetails,
    isLoading: isLoadingUser || isLoadingData,
    subscription,
  }
  return <UserContext.Provider value={value} {...props} />
}

export const useUser = (): UserContextType => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUSer must be used within a MyUserContextProvider')
  }
  return context
}
