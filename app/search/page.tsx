import getSongsByTitle from '@/actions/getSongsByTitle'
import Header from '@/components/Header'
import SearchInput from '@/components/SearchInput'
import SearchContent from './components/SearchContent'
import SearchWrapper from './components/SearchWrapper'

interface SearchProps {
	searchParams: {
		title: string
	}
}

export const revalidate = 0

const Search = async ({ searchParams }: SearchProps) => {
	const songs = await getSongsByTitle(searchParams.title)

	return (
		<SearchWrapper>
			<Header bgColor={'neutral-900'}>
				<div className='mb-2 flex flex-col gap-y-6'>
					<h1 className='text-white text-3xl font-semibold'>
						Search
					</h1>
					<SearchInput />
				</div>
			</Header>
			<SearchContent songs={songs} />
		</SearchWrapper>
	)
}

export default Search
