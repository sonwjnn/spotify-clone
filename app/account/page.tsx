import Header from '@/components/Header'
import AccountContent from './components/AccountContent'
import Navbar from '@/components/Navbar'
import PageWrapper from '@/components/PageWrapper'

const Account = () => {
	return (
		<div className='relative h-full w-full'>
			<Navbar bgColor={'bg-neutral-900'} />
			<PageWrapper>
				<Header
					className='bg-gradient-to-b from-neutral-900'
					bgColor={'bg-neutral-900'}
				>
					<div className='mb-2 flex flex-col gap-y-6 '>
						<div className='text-white text-3xl font-semibold'>
							Account Settings
						</div>
					</div>
				</Header>
				<AccountContent />
			</PageWrapper>
		</div>
	)
}

export default Account
