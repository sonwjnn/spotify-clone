'user client'

import { MyUserContextProvider } from '@/hooks/use-user'

type UserProviderProps = {
  children: React.ReactNode
}

export const UserProvider = ({ children }: UserProviderProps) => {
  return <MyUserContextProvider>{children}</MyUserContextProvider>
}
