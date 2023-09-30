'use client'

import HeaderLoading from '@/components/LoadingLayout/HeaderLoading'
import MediaLoading from '@/components/LoadingLayout/MediaLoading'
import Skeleton from 'react-loading-skeleton'

const Loading = () => {
	return (
		<div className='bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:[width:0px]'>
			<HeaderLoading className='from-emerald-800'>
				<div className='flex flex-col md:flex-row items-center gap-x-5'>
					<div className='relative h-32 w-32 lg:h-44 lg:w-44'>
						<Skeleton height={'100%'} />
					</div>
					<div className='flex flex-col gap-y-2 mt-4 md:mt-0 '>
						<p className='hidden md:block font-semibold text-sm w-[80px]'>
							<Skeleton height={'20px'} borderRadius={50} />
						</p>
						<h1 className='text-white text-4xl sm:text-5xl lg:text-7xl font-bold w-[265px]'>
							<Skeleton height={'48px'} borderRadius={50} />
						</h1>
					</div>
				</div>
			</HeaderLoading>
			<div className='flex flex-col gap-y-2 w-full p-6'>
				{Array(4).fill(0).map((item, index) => (
					<MediaLoading key={index} />
				))}
			</div>
		</div>
	)
}

export default Loading
