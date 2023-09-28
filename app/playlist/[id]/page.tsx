import Header from '@/components/Header'
import Navbar from '@/components/Navbar'
import PageWrapper from '@/components/PageWrapper'
import HeaderContent from './components/HeaderContent'
import getPlaylistById from '@/actions/getPlaylistById'

interface PlaylistProps {
	playlistParams: {
		id: string
	}
}

export const revalidate = 0

const PlaylistItem = async ({ params }: { params: { id: string } }) => {
	const playlist = await getPlaylistById(params.id)
	return (
		<div className='relative h-full w-full'>
			<Navbar />
			<PageWrapper>
				<Header className='bg-gradient-to-b from-neutral-600'>
					<HeaderContent id={params.id} data={playlist} />
				</Header>
			</PageWrapper>
		</div>
	)
}

export default PlaylistItem
