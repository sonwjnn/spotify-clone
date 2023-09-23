import Header from '@/components/Header'
import AccountContent from './components/AccountContent'
import AccountWrapper from './components/AccountWrapper'

const Account = () => {
	return (
		<AccountWrapper>
			<Header bgColor={'neutral-900'}>
				<div className='mb-2 flex flex-col gap-y-6 '>
					<div className='text-white text-3xl font-semibold'>
						Account Settings
					</div>
				</div>
			</Header>
			<AccountContent />
		</AccountWrapper>
	)
}

export default Account
