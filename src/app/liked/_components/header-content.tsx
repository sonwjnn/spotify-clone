'use client'

import Image from 'next/image'

import { useMainLayout } from '@/store/use-main-layout'

export const HeaderContent = () => {
  const { width } = useMainLayout()

  return (
    <div className="flex flex-col items-center gap-x-5 md:flex-row">
      <div
        className={`${
          width <= 875 && '!h-[192px] !w-[192px]'
        } flex h-[232px] w-[232px] items-center justify-center rounded-sm bg-[#282828] text-white shadow-base`}
      >
        <div className="relative aspect-square h-full w-full overflow-hidden rounded-sm">
          <Image
            className="
            object-cover
          "
            src={'/images/liked.png'}
            fill
            alt="liked img"
            sizes="100%"
          />
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-y-2 md:mt-0">
        <p className="hidden text-base text-white  md:block">Playlist</p>
        <h1
          className={`${
            width <= 1012 && '!text-5xl'
          } text-center text-7xl font-bold text-white md:text-left`}
        >
          Liked Songs
        </h1>
        <p className="hidden text-sm text-white md:block">
          Your favorite songs
        </p>
      </div>
    </div>
  )
}
