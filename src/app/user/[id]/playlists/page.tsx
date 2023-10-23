import type { NextPage } from 'next'

import { Alert } from '@/components/alert'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { Navbar } from '@/components/navbar'
import { PageWrapper } from '@/components/page-wrapper'
import { getOtherUserPlaylists } from '@/server-actions/playlists/get-other-user-playlists'

import { UserPlaylistContent } from './_components/user-playlist-content'

interface UserPlaylistPageProps {
  params: {
    id: string
  }
}

export const revalidate = 0

const UserPlaylistPage: NextPage<UserPlaylistPageProps> = async ({
  params,
}: UserPlaylistPageProps) => {
  const playlists = await getOtherUserPlaylists(params.id)
  if (!playlists) {
    return <Alert type="notfound" />
  }
  return (
    <PageWrapper>
      <Navbar bgColor={'#171717'} darker={false} />
      <Header bgColor="#171717">
        <div className="mb-2  w-full ">
          <h1 className="pt-10 text-3xl font-bold text-white">
            Public Playlists
          </h1>
        </div>
      </Header>
      <UserPlaylistContent data={playlists} />
      <Footer />
    </PageWrapper>
  )
}

export default UserPlaylistPage
