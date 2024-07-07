'use client'

import Skeleton from 'react-loading-skeleton'

export const MediaLoading = () => {
  return (
    <div className="group grid h-[56px] w-full cursor-pointer grid-cols-list-5 items-center gap-4 rounded-md px-4 transition hover:bg-white  dark:hover:bg-zinc-700/10">
      <div className="relative select-none text-base text-neutral-400">
        <div className="relative ml-2 flex  h-full w-3 items-center overflow-hidden "></div>
      </div>
      <div className={`flex min-w-0 select-none items-center gap-4 pr-2`}>
        <div className={`mb-2 aspect-square h-10 w-10`}>
          <Skeleton height={'100%'} />
        </div>
        <div className={`flex h-full flex-col`}>
          <Skeleton borderRadius={50} height={'15px'} width={'200px'} />
          <Skeleton borderRadius={50} height={'10px'} width={'60px'} />
        </div>
      </div>
    </div>
  )
}
