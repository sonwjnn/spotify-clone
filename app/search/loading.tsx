'use client'

import HeaderLoading from '@/components/LoadingLayout/HeaderLoading'
import Skeleton from 'react-loading-skeleton'

const Loading = () => {
	return (
		<div className='bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:[width:0px]'>
			<HeaderLoading className='from-bg-neutral-900'>
				<div className='mb-2 flex flex-col gap-y-6'>
					<h1 className='text-white text-3xl font-semibold w-[200px]'>
						<Skeleton height={'46px'} borderRadius={50} />
					</h1>
					<Skeleton height={'46px'} borderRadius={8} />
				</div>
			</HeaderLoading>
			<div className='flex flex-col gap-y-2 w-full p-6'>
				{Array(6).fill(0).map((item, index) => (
					<div
						key={index}
						className='flex items-center gap-x-4 w-full'
					>
						<div className='flex-1'>
							<div className='
                 flex
                 item-center
                 gap-x-3
                 cursor-pointer
                 bg-neutral-800/50
                 w-full
                 p-2
                 rounded-md
              '>
								<div className='
                  relative
                  rounded-md
                  min-h-[48px]
                  min-w-[48px]
                  overflow-hidden
                '>
									<Skeleton width={'100%'} height={'100%'} />
								</div>
								<div className='
                   flex
                   flex-col
                   gap-y-1
                   overflow-hidden
                   w-full
                '>
									<p className='text-white truncate'>
										<Skeleton
											width={'30%'}
											borderRadius={50}
										/>
									</p>
									<p className='text-neutral-400 text-sm truncate'>
										<Skeleton
											width={'20%'}
											borderRadius={50}
										/>
									</p>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default Loading
