import getSongsByTitle from '@/actions/getSongsByTitle'
import Header from '@/components/Header'
import SearchInput from '@/components/SearchInput'
import SearchContent from './components/SearchContent'
import SearchWrapper from './components/SearchWrapper'
import Navbar from '@/components/Navbar'

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
			<SearchWrapper>
				<Header className='bg-gradient-to-b from-neutral-900'>
					<div className='mb-2 flex flex-col gap-y-6'>
						<h1 className='text-white text-3xl font-semibold'>
							Search
						</h1>
						<SearchInput />
					</div>
				</Header>
				<SearchContent songs={songs} />
			</SearchWrapper>
		</div>
	)
}

export default Search
