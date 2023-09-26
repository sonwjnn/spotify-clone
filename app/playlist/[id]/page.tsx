import Header from '@/components/Header'
import Navbar from '@/components/Navbar'
import PageWrapper from '@/components/PageWrapper'
import HeaderContent from './components/HeaderContent'

const PlaylistItem = ({ params }: { params: { id: string } }) => {
	return (
		<div className='relative h-full w-full'>
			<Navbar />
			<PageWrapper>
				<Header>
					<HeaderContent id={params.id} />
				</Header>
			</PageWrapper>
		</div>
	)
}

export default PlaylistItem
