import Header from '@/components/Header'
import React from 'react'
import AccountContent from './components/AccountContent'

const Account = () => {
	return (
		<div className='bg-neutral-900 rounded-lg w-full h-full overflow-hidden overflow-y-auto'>
			<Header className='from-bg-neutral-900'>
				<div className='mb-2 flex flex-col gap-y-6 '>
					<div className='text-white text-3xl font-semibold'>
						Account Settings
					</div>
				</div>
			</Header>
			<AccountContent />
		</div>
	)
}

export default Account
