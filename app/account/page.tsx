import Header from '@/components/Header'
import AccountContent from './components/AccountContent'
import Navbar from '@/components/Navbar'
import PageWrapper from '@/components/PageWrapper'

const Account = () => {
	return (
		<div className='relative h-full w-full'>
			<Navbar bgColor='#171717' darker={false} />
			<PageWrapper>
				<Header
					bgColor={'#171717'}
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
