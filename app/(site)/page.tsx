import getSongs from '@/actions/getSongs'
import Header from '@/components/Header'
import ListItem from '@/components/ListItem'
import PageContent from './components/PageContent'
import Navbar from '@/components/Navbar'
import PageWrapper from '@/components/PageWrapper'

export const revalidate = 0

const Home = async () => {
	const songs = await getSongs()

	return (
		<div className='relative h-full w-full'>
			<Navbar />
			<PageWrapper>
				<Header>
					<div className='mb-2'>
						<h1 className='text-white text-3xl font-semibold'>
							Welcome back
						</h1>
						<div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4'>
							<ListItem
								image='/images/liked.png'
								name='Liked Songs'
								href='liked'
							/>
						</div>
					</div>
				</Header>
				<div className='mt-2 px-6'>
					<div className='flex justify-between items-center'>
						<h1 className='text-white text-2xl font-semibold'>
							Newest songs
						</h1>
					</div>
					<PageContent songs={songs} />
				</div>
			</PageWrapper>
		</div>
	)
}

export default Home
