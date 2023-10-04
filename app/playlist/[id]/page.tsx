import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import PageWrapper from "@/components/PageWrapper";
import HeaderContent from "./components/HeaderContent";
import getPlaylistById from "@/actions/getPlaylistById";
import PlaylistContent from "./components/PlaylistContent";
import getSongsByTitle from "@/actions/getSongsByTitle";
import getSongsByIds from "@/actions/getSongsByIds";
import Footer from "@/components/Footer";

interface PlaylistProps {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string };
}

export const revalidate = 0;

const PlaylistItem = async ({ params, searchParams }: PlaylistProps) => {
  const playlist = await getPlaylistById(params.id);

  if (!playlist) {
    return (
      <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
        No playlist found.
      </div>
    );
  }

  const addedSongs = await getSongsByIds(playlist?.song_ids || []);
  const songs = await getSongsByTitle(searchParams?.title);

  return (
    <div className="relative h-full w-full">
      <Navbar data={playlist} />
      <PageWrapper>
        <Header data={playlist}>
          <HeaderContent id={params.id} data={playlist} />
        </Header>
        <PlaylistContent
          playlist={playlist}
          songs={songs}
          addedSongs={addedSongs}
        />
        <Footer />
      </PageWrapper>
    </div>
  );
};

export default PlaylistItem;
