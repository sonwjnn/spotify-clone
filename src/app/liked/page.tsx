import Header from "@/components/Header";
import LikedContent from "./_components/LikedContent";
import Navbar from "@/components/Navbar";
import PageWrapper from "@/components/PageWrapper";
import HeaderContent from "./_components/HeaderContent";
import Footer from "@/components/Footer";

const Liked = async () => {
  return (
    <div className="relative h-full w-full">
      <Navbar bgColor="#543ca2" />
      <PageWrapper>
        <Header type="playlist" bgColor="#543ca2">
          <HeaderContent />
        </Header>

        <LikedContent bgColor="#543ca2" />
        <Footer />
      </PageWrapper>
    </div>
  );
};
export default Liked;
