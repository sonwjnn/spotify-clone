import type { NextPage } from 'next'

import { Alert } from '@/components/alert'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { Navbar } from '@/components/navbar'
import { getPlaylistById } from '@/server-actions/playlists/get-playlist-by-id'
import { getSongsByIds } from '@/server-actions/songs/get-songs-by-ids'
import { getSongsByTitle } from '@/server-actions/songs/get-songs-by-title'

import { HeaderPlaylistContent } from './_components/header-playlist-content'
import { PlaylistContent } from './_components/playlist-content'

interface PlaylistPageProps {
  params: {
    id: string
  }
  searchParams: { [key: string]: string }
}

export const revalidate = 0

const PlaylistPage: NextPage<PlaylistPageProps> = async ({
  params,
  searchParams,
}: PlaylistPageProps) => {
  const playlist = await getPlaylistById(params.id)

  if (!playlist) {
    return <Alert type="notfound" />
  }

  const addedSongs = await getSongsByIds(playlist?.song_ids || [])
  const songs = await getSongsByTitle(searchParams?.title as string)

  return (
    <div className="h-full w-full">
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
    </div>
  )
}

export default PlaylistPage
