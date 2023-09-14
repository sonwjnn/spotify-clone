'use client'
import Skeleton from 'react-loading-skeleton'
import HeaderLoading from '@/components/LoadingLayout/HeaderLoading'

const Loading = () => {
	return (
		<div className='bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto'>
			<HeaderLoading className='from-emerald-800'>
				<div className='mb-2'>
					<h1 className='text-white text-3xl font-semibold w-[200px]'>
						<Skeleton height={'100%'} />
					</h1>
					<div className='grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4 h-[61px]'>
						<button className='relative  group flex items-center rounded-md overflow-hidden gap-x-4 bg-neutral-100/10  hover:bg-neutral-100/20 transition pr-4'>
							<div className='relative min-h-[64px] min-w-[64px]'>
								<Skeleton
									height={'64px'}
									width={'100%'}
								/>
							</div>
							<p className='font-medium truncate py-5  w-[200px]'>
								<Skeleton
									height={'100%'}
									borderRadius={50}
									width={'100%'}
								/>
							</p>
						</button>
					</div>
				</div>
			</HeaderLoading>
			<div className='mt-2 mb-7 px-6'>
				<div className='flex justify-between items-center'>
					<h1 className='text-white text-2xl font-semibold'>
						<Skeleton height={'100%'} borderRadius={50} />
					</h1>
				</div>
				<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-col-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-4'>
					{Array(8).fill(0).map((item, index) => (
						<div
							key={index}
							className='relative flex flex-col group items-center justify-center rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10 transition p-3'
						>
							<div className='relative aspect-square h-full w-full rounded-md overflow-hidden'>
								<Skeleton height={'100%'} width={'100%'} />
							</div>

							<div className='flex flex-col items-start w-full pt-4 gap-y-1'>
								<p className='truncate font-semibold w-full'>
									<Skeleton
										height={'100%'}
										width={'100%'}
										borderRadius={50}
									/>
								</p>
								<p className='text-neutral-400 text-sm pb-4 w-full truncate'>
									<Skeleton
										height={'100%'}
										width={'50%'}
										borderRadius={50}
									/>
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default Loading
