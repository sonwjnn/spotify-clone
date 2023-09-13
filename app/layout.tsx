import './globals.css'
import { Figtree } from 'next/font/google'
import Sidebar from '@/components/Sidebar'
import SupabaseProvider from '@/providers/SupabaseProvider'
import UserProvider from '@/providers/UserProvider'
import ModalProvider from '@/providers/ModalProvider'
import ToasterProvider from '@/providers/ToasterProvider'
import SkeletonProvider from '@/providers/SkeletonProvider'
import getSongsByUserId from '@/actions/getSongsByUserId'
import Player from '@/components/Player'
import getActiveProductsWithPrices from '@/actions/getActiveProductsWithPrices'

const font = Figtree({ subsets: ['latin'] })

export const metadata = {
	title: 'Spotify Clone',
	description: 'Listen to music!',
}

export const revalidate = 0

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const userSongs = await getSongsByUserId()
	const products = await getActiveProductsWithPrices()

	return (
		<html lang='en' suppressHydrationWarning={true}>
			<body className={font.className}>
				<ToasterProvider />
				<SkeletonProvider>
					<SupabaseProvider>
						<UserProvider>
							<ModalProvider products={products} />
							<Sidebar songs={userSongs}>{children}</Sidebar>
							<Player />
						</UserProvider>
					</SupabaseProvider>
				</SkeletonProvider>
			</body>
		</html>
	)
}
