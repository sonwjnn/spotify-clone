'use client'

import Skeleton from 'react-loading-skeleton'

export const CardLoading = () => {
  return (
    <div className="group relative flex cursor-pointer flex-col items-center justify-center gap-x-4 overflow-hidden rounded-md bg-zinc-200 p-3 transition dark:bg-neutral-400/5 dark:hover:bg-neutral-400/10">
      <div className="relative aspect-square h-full w-full overflow-hidden rounded-md">
        <Skeleton height={'100%'} width={'100%'} />
      </div>

      <div className="flex w-full flex-col items-start gap-y-1 pt-4">
        <p className="w-full truncate font-semibold">
          <Skeleton height={'100%'} width={'100%'} borderRadius={50} />
        </p>
        <p className="w-full truncate pb-4 text-sm text-neutral-400">
          <Skeleton height={'100%'} width={'50%'} borderRadius={50} />
        </p>
      </div>
    </div>
  )
}
