'use client'

import HeaderLoading from '@/components/LoadingLayout/HeaderLoading'
import Skeleton from 'react-loading-skeleton'

const Loading = () => {
	return (
		<div className='bg-neutral-900 rounded-lg w-full h-full overflow-hidden overflow-y-auto'>
			<HeaderLoading className='from-bg-neutral-900'>
				<div className='mb-2 flex flex-col gap-y-6 '>
					<div className='text-white text-3xl font-semibold'>
						<Skeleton
							height={'100%'}
							width={'50%'}
							borderRadius={50}
						/>
					</div>
				</div>
			</HeaderLoading>
			<div className='mb-7 px-6'>
				<div className='flex flex-col gap-y-4'>
					<Skeleton height={'100%'} width={'30%'} borderRadius={50} />
					<Skeleton
						height={'50px'}
						width={'300px'}
						borderRadius={50}
					/>
				</div>
			</div>
		</div>
	)
}

export default Loading
