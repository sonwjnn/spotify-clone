import "./globals.css";
import localFont from "@next/font/local";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import SkeletonProvider from "@/providers/SkeletonProvider";
import getSongsByUserId from "@/actions/getSongsByUserId";
import Player from "@/components/Player";
import getActiveProductsWithPrices from "@/actions/getActiveProductsWithPrices";
import MainContent from "@/components/MainContent/MainContent";
import getPlaylistsByUserId from "@/actions/getPlaylistsByUserId";
import getLikedSongs from "@/actions/getLikedSongs";

const circularSp = localFont({
  src: [
    {
      path: "../public/fonts/CircularSp-Book.woff2",
      weight: "400",
    },
    {
      path: "../public/fonts/CircularSp-Bold.woff2",
      weight: "700",
    },
  ],
  variable: "--font-circularSp",
});

export const metadata = {
  title: "Spotify Clone",
  description: "Listen to music!",
};

export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const products = await getActiveProductsWithPrices();
  const userSongs = await getSongsByUserId();
  const playlists = await getPlaylistsByUserId();
  const likedSongs = await getLikedSongs();

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${circularSp.variable} font-sans`}>
        <ToasterProvider />
        <SkeletonProvider>
          <SupabaseProvider>
            <UserProvider>
              <ModalProvider products={products} />
              <MainContent
                songs={userSongs}
                playlists={playlists}
                likedSongs={likedSongs}
              >
                {children}
              </MainContent>
              <Player />
            </UserProvider>
          </SupabaseProvider>
        </SkeletonProvider>
      </body>
    </html>
  );
}
