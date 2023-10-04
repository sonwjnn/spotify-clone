import getSongs from "@/actions/getSongs";
import Header from "@/components/Header";
import PageContent from "./components/PageContent";
import Navbar from "@/components/Navbar";
import PageWrapper from "@/components/PageWrapper";
import Greeting from "@/components/Greeting";
import Footer from "@/components/Footer";
import getPlaylists from "@/actions/getPlaylists";

export const revalidate = 0;

const Home = async () => {
  const songs = await getSongs();
  const playlists = await getPlaylists();
  return (
    <div className="relative h-full w-full">
      <Navbar />
      <PageWrapper>
        <Header>
          <div className="mb-2">
            <Greeting playlists={playlists} />
          </div>
        </Header>
        <div className="mt-2 px-6">
          <div className="flex justify-between items-center">
            <h1 className="text-white text-2xl font-semibold">Newest songs</h1>
          </div>
          <PageContent songs={songs} />
          <Footer />
        </div>
      </PageWrapper>
    </div>
  );
};

export default Home;
