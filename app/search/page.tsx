import getSongsByTitle from '@/actions/getSongsByTitle'
import Header from '@/components/Header'
import SearchInput from '@/components/SearchInput'
import SearchContent from './components/SearchContent'
import Navbar from '@/components/Navbar'
import PageWrapper from '@/components/PageWrapper'

interface SearchProps {
	searchParams: {
		title: string
	}
}

export const revalidate = 0

const Search = async ({ searchParams }: SearchProps) => {
	const songs = await getSongsByTitle(searchParams.title)

	return (
		<div className='relative h-full w-full'>
			<Navbar bgColor={'bg-neutral-900'} />
			<PageWrapper>
				<Header className='bg-gradient-to-b from-neutral-900'>
					<div className='mb-2 flex flex-col gap-y-6'>
						<h1 className='text-white text-3xl font-semibold'>
							Search
						</h1>
						<SearchInput />
					</div>
				</Header>
				<SearchContent songs={songs} />
			</PageWrapper>
		</div>
	)
}

export default Search
