import './globals.css'
import { Figtree } from 'next/font/google'
import SupabaseProvider from '@/providers/SupabaseProvider'
import UserProvider from '@/providers/UserProvider'
import ModalProvider from '@/providers/ModalProvider'
import ToasterProvider from '@/providers/ToasterProvider'
import SkeletonProvider from '@/providers/SkeletonProvider'
import getSongsByUserId from '@/actions/getSongsByUserId'
import Player from '@/components/Player'
import getActiveProductsWithPrices from '@/actions/getActiveProductsWithPrices'
import { Providers as ReduxProvider } from '@/redux/provider'
import MainContent from '@/components/MainContent'

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
	const products = await getActiveProductsWithPrices()
	const userSongs = await getSongsByUserId()
	return (
		<html lang='en' suppressHydrationWarning={true}>
			<body className={font.className}>
				<ToasterProvider />
				<SkeletonProvider>
					<SupabaseProvider>
						<ReduxProvider>
							<UserProvider>
								<ModalProvider products={products} />
								<MainContent songs={userSongs}>
									{children}
								</MainContent>
								<Player />
							</UserProvider>
						</ReduxProvider>
					</SupabaseProvider>
				</SkeletonProvider>
			</body>
		</html>
	)
}
