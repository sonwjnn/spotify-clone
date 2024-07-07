import type { NextPage } from 'next'

import { Alert } from '@/components/alert'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { Navbar } from '@/components/navbar'
import { getPlaylistById } from '@/server-actions/playlists/get-playlist-by-id'
import { getPlaylistSongs } from '@/server-actions/playlists/get-playlist-songs'

import { PlaylistContent } from './_components/playlist-content'
import { PlaylistHeaderContent } from './_components/playlist-header-content'

type PlaylistPageProps = {
  params: {
    id: string
  }
}

export const revalidate = 0

const PlaylistPage: NextPage<PlaylistPageProps> = async ({
  params,
}: PlaylistPageProps) => {
  const playlist = await getPlaylistById(params.id)
  const playlistSongs = await getPlaylistSongs(params.id)

  if (!playlist) {
    return <Alert type="notfound" />
  }

  return (
    <div className="h-full w-full">
      <Navbar type="playlist" data={playlist} hasPlayBtn />
      <Header data={playlist} type="playlist">
        <PlaylistHeaderContent />
      </Header>
      <PlaylistContent playlist={playlist} playlistSongs={playlistSongs} />
      <Footer />
    </div>
  )
}

export default PlaylistPage
