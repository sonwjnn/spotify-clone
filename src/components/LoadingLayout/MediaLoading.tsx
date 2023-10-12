'use client'

import Skeleton from 'react-loading-skeleton'

const MediaLoading: React.FC = () => {
  return (
    <div className="flex w-full items-center gap-x-4">
      <div className="flex-1">
        <div
          className="
            flex
            w-full
            cursor-pointer
            items-center
            gap-x-3
            rounded-md
          bg-neutral-800/50
            p-2
          "
        >
          <div
            className="
                  relative
                  min-h-[48px]
                  min-w-[48px]
                  overflow-hidden
                  rounded-md
                "
          >
            <Skeleton width={'100%'} height={'100%'} />
          </div>
          <div
            className="
              flex
              w-full
              flex-col
              gap-y-1
              overflow-hidden
            "
          >
            <p className="truncate text-white">
              <Skeleton width={'30%'} borderRadius={50} />
            </p>
            <p className="truncate text-sm text-neutral-400">
              <Skeleton width={'20%'} borderRadius={50} />
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MediaLoading
