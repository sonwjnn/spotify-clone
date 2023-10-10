'use client'

import useMainLayout from '@/stores/useMainLayout'
import Image from 'next/image'

interface HeaderContentProps {}
const HeaderContent: React.FC<HeaderContentProps> = () => {
  const { width } = useMainLayout()

  return (
    <div className="flex flex-col md:flex-row items-center gap-x-5">
      <div
        className={`${
          width <= 875 && '!h-[192px] !w-[192px]'
        } h-[232px] w-[232px] text-white bg-[#282828] rounded-sm flex items-center justify-center shadow-base`}
      >
        <div className="relative aspect-square h-full w-full rounded-sm overflow-hidden">
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
      <div className="flex flex-col gap-y-2 mt-4 md:mt-0">
        <p className="hidden md:block  text-base">Playlist</p>
        <h1
          className={`${
            width <= 1012 && '!text-5xl'
          } text-white text-center md:text-left text-7xl font-bold`}
        >
          Liked Songs
        </h1>
        <p className="hidden md:block text-sm">Your favorite songs</p>
      </div>
    </div>
  )
}

export default HeaderContent
