import type { NextPage } from 'next'

import { Alert } from '@/components/alert'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { Navbar } from '@/components/navbar'
import { PageWrapper } from '@/components/page-wrapper'
import { getOtherUserPlaylists } from '@/server-actions/playlists/get-other-user-playlists'

import { UserContent } from './_components/user-content'
import { UserHeaderContent } from './_components/user-header-content'

interface UserPageProps {
  params: {
    id: string
  }
}

export const revalidate = 0

const UserPage: NextPage<UserPageProps> = async ({ params }: UserPageProps) => {
  const playlists = await getOtherUserPlaylists(params.id)
  if (!playlists) {
    return <Alert type="notfound" />
  }
  return (
    <PageWrapper>
      <Navbar type="user" hasUsername />
      <Header type="user">
        <UserHeaderContent data={playlists} />
      </Header>
      <UserContent data={playlists} id={params.id} />
      <Footer />
    </PageWrapper>
  )
}

export default UserPage
