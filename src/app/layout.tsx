import './globals.css'

import localFont from 'next/font/local'

import { MainContent } from '@/components/main-content/main-content'
import { MusicPlayer } from '@/components/music-player/music-player'
import { ModalProvider } from '@/providers/modal-provider'
import { SkeletonProvider } from '@/providers/skeleton-provider'
import { SupabaseProvider } from '@/providers/supabase-provider'
import { ToasterProvider } from '@/providers/toaster-provider'
import { UserProvider } from '@/providers/user-provider'
import { getLikedPlaylists } from '@/server-actions/playlists/get-liked-playlists'
import { getUserPlaylists } from '@/server-actions/playlists/get-user-playlists'
import { getActiveProductsWithPrices } from '@/server-actions/products/get-active-products-with-prices'
import { getLikedSongs } from '@/server-actions/songs/get-liked-songs'
import { getSongsByUserId } from '@/server-actions/songs/get-songs-by-user-id'
import { ThemeProvider } from 'next-themes'

const circularSp = localFont({
  src: [
    {
      path: '../../public/fonts/CircularSp-Book.woff2',
      weight: '400',
    },
    {
      path: '../../public/fonts/CircularSp-Bold.woff2',
      weight: '700',
    },
  ],
  variable: '--font-circularSp',
})

export const metadata = {
  title: 'Spotify Clone',
  description: 'Listen to music!',
}

export const revalidate = 0

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}): Promise<JSX.Element> {
  const productsData = getActiveProductsWithPrices()
  const userSongsData = getSongsByUserId()
  const playlistsData = getUserPlaylists()
  const likedSongsData = getLikedSongs()
  const likedPlaylistsData = getLikedPlaylists()

  const [products, userSongs, playlists, likedSongs, likedPlaylists] =
    await Promise.all([
      productsData,
      userSongsData,
      playlistsData,
      likedSongsData,
      likedPlaylistsData,
    ])

  return (
    <html lang="en">
      <body className={`${circularSp.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="spotify-theme"
        >
          <ToasterProvider />
          <SkeletonProvider>
            <SupabaseProvider>
              <UserProvider>
                <ModalProvider products={products} />
                <MainContent
                  songs={userSongs}
                  playlists={playlists}
                  likedSongs={likedSongs}
                  likedPlaylists={likedPlaylists}
                >
                  {children}
                </MainContent>
                <MusicPlayer />
              </UserProvider>
            </SupabaseProvider>
          </SkeletonProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
