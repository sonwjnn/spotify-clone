import type { NextPage } from 'next'

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Navbar from '@/components/Navbar'
import PageWrapper from '@/components/PageWrapper'
import getPlaylistById from '@/server-actions/playlists/getPlaylistById'
import getSongsByIds from '@/server-actions/songs/getSongsByIds'
import getSongsByTitle from '@/server-actions/songs/getSongsByTitle'

import HeaderPlaylistContent from './_components/HeaderPlaylistContent'
import PlaylistContent from './_components/PlaylistContent'

interface PlaylistProps {
  params: {
    id: string
  }
  searchParams: { [key: string]: string }
}

export const revalidate = 0

const Playlist: NextPage<PlaylistProps> = async ({
  params,
  searchParams,
}: PlaylistProps) => {
  const playlist = await getPlaylistById(params.id)

  if (!playlist) {
    return (
      <div className="flex w-full flex-col gap-y-2 px-6 text-neutral-400">
        No playlist found.
      </div>
    )
  }

  const addedSongs = await getSongsByIds(playlist?.song_ids || [])
  const songs = await getSongsByTitle(searchParams?.title as string)

  return (
    <PageWrapper>
      <Navbar type="playlist" data={playlist} songs={addedSongs} hasPlayBtn />
      <Header data={playlist} type="playlist">
        <HeaderPlaylistContent data={playlist} songs={addedSongs} />
      </Header>
      <PlaylistContent
        playlist={playlist}
        songs={songs}
        addedSongs={addedSongs}
      />
      <Footer />
    </PageWrapper>
  )
}

export default Playlist
