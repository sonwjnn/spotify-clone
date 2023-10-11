import Header from '@/components/Header'
import Navbar from '@/components/Navbar'
import PageWrapper from '@/components/PageWrapper'
import HeaderPlaylistContent from './_components/HeaderPlaylistContent'
import getPlaylistById from '@/server-actions/playlists/getPlaylistById'
import PlaylistContent from './_components/PlaylistContent'
import getSongsByTitle from '@/server-actions/songs/getSongsByTitle'
import getSongsByIds from '@/server-actions/songs/getSongsByIds'
import Footer from '@/components/Footer'

interface PlaylistProps {
  params: {
    id: string
  }
  searchParams: { [key: string]: string }
}

export const revalidate = 0

const Playlist = async ({ params, searchParams }: PlaylistProps) => {
  const playlist = await getPlaylistById(params.id)

  if (!playlist) {
    return (
      <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
        No playlist found.
      </div>
    )
  }

  const addedSongs = await getSongsByIds(playlist?.song_ids || [])
  const songs = await getSongsByTitle(searchParams?.title)

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
