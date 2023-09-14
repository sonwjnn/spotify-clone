import './globals.css'
import { Figtree } from 'next/font/google'
// import Split from 'react-split'
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
	// const test = <Split></Split>

	// console.log(test ? true : false)

	return (
		<html lang='en' suppressHydrationWarning={true}>
			<body className={font.className}>
				<ToasterProvider />
				<SkeletonProvider>
					<SupabaseProvider>
						<UserProvider>
							<ModalProvider products={products} />
							{/* <Split */}
							{/* 	cursor='col-resize' */}
							{/* 	minSize={false ? [280, 400, 0] : [280, 600]} */}
							{/* 	maxSize={false */}
							{/* 		? [500, 99999, 400] */}
							{/* 		: [500, 99999]} */}
							{/* 	// sizes={[20, 70, 10]} */}
							{/* 	sizes={false ? [20, 60, 20] : [20, 80]} */}
							{/* 	className={'flex flex-row h-full w-full'} */}
							{/* 	gutterSize={8} */}
							{/* 	snapOffset={20} */}
							{/* > */}
							<Sidebar songs={userSongs}>{children}</Sidebar>
							{/* </Split> */}
							<Player />
						</UserProvider>
					</SupabaseProvider>
				</SkeletonProvider>
			</body>
		</html>
	)
}
