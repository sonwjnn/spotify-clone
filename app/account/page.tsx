import Header from '@/components/Header'
import AccountContent from './components/AccountContent'
import AccountWrapper from './components/AccountWrapper'
import Navbar from '@/components/Navbar'

const Account = () => {
	return (
		<div className='relative h-full w-full'>
			<AccountWrapper>
				<Navbar bgColor={'bg-neutral-900'} />
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
			</AccountWrapper>
		</div>
	)
}

export default Account
