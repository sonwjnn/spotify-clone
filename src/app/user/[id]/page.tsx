import type { NextPage } from 'next'

import { Alert } from '@/components/alert'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { Navbar } from '@/components/navbar'
import { PageWrapper } from '@/components/page-wrapper'
import { getPlaylistsByUserId } from '@/server-actions/playlists/get-playlists-by-user-id'

import { HeaderContent } from './_components/header-content'
import { UserContent } from './_components/user-content'

interface UserPageProps {
  params: {
    id: string
  }
}

export const revalidate = 0

const UserPage: NextPage<UserPageProps> = async ({ params }: UserPageProps) => {
  const playlists = await getPlaylistsByUserId()
  if (!playlists) {
    return <Alert type="notfound" />
  }
  return (
    <PageWrapper>
      <Navbar type="user" hasUsername />
      <Header type="user">
        <HeaderContent data={playlists} />
      </Header>
      <UserContent playlists={playlists} />
      <Footer />
    </PageWrapper>
  )
}

export default UserPage
