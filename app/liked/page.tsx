import Header from "@/components/Header";
import LikedContent from "./components/LikedContent";
import Navbar from "@/components/Navbar";
import PageWrapper from "@/components/PageWrapper";
import HeaderContent from "./components/HeaderContent";
import Footer from "@/components/Footer";

const Liked = async () => {
  return (
    <div className="relative h-full w-full">
      <Navbar bgColor="#543ca2" />
      <PageWrapper>
        <Header bgColor="#543ca2">
          <HeaderContent />
        </Header>

        <LikedContent />
        <Footer />
      </PageWrapper>
    </div>
  );
};
export default Liked;
