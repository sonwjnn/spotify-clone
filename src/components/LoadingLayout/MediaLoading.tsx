'use client'

import Skeleton from 'react-loading-skeleton'

const MediaLoading = () => {
	return (
		<div className='flex items-center gap-x-4 w-full'>
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
	)
}

export default MediaLoading
