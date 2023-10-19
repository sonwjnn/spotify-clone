'use client'

import Image from 'next/image'

import { useAuthModal } from '@/hooks/use-auth-modal'
import { usePlaylistModal } from '@/hooks/use-playlist-modal'
import { useSubscribeModal } from '@/hooks/use-subcribe-modal'
import { useUser } from '@/hooks/use-user'
import { MusicNote } from '@/public/icons'
import { useMainLayout } from '@/stores/use-main-layout'
import type { Playlist } from '@/types/types'

interface HeaderContentProps {
  data?: Playlist[]
}
export const HeaderContent: React.FC<HeaderContentProps> = ({ data }) => {
  const { width } = useMainLayout()
  const { user, subscription } = useUser()
  const authModal = useAuthModal()
  const uploadModal = usePlaylistModal()

  const subcribeModal = useSubscribeModal()

  const imageUrl = user?.user_metadata.avatar_url

  const onClick = (): void => {
    if (!user) {
      return authModal.onOpen()
    }
    if (!subscription) {
      return subcribeModal.onOpen()
    }

    return uploadModal.onOpen()
  }

  return (
    <div className="flex flex-col  items-center gap-x-5  md:flex-row md:items-end">
      <div
        className={`${
          width <= 875 && '!h-[192px] !w-[192px]'
        } flex h-[232px] w-[232px] items-center justify-center rounded-full bg-[#282828] text-white shadow-base `}
      >
        {imageUrl ? (
          <div className="relative aspect-square h-full w-full overflow-hidden rounded-full">
            <Image
              className="
            object-cover
          "
              src={imageUrl}
              fill
              alt="user image"
              sizes="100%"
              priority={true}
            />
          </div>
        ) : (
          <MusicNote size={50} />
        )}
      </div>
      <div className="mt-4 flex  flex-col gap-y-3 md:mt-0 md:gap-y-6">
        <p className="hidden text-base text-white  md:block">Profile</p>
        <h1
          onClick={onClick}
          className={`${width <= 1012 && '!text-5xl'} ${
            width <= 901 && '!text-3xl'
          } flex cursor-pointer text-center text-7xl font-bold text-white md:text-left`}
        >
          {user?.user_metadata.full_name || 'User Name'}
        </h1>
        <div className="flex flex-col items-center gap-y-2 md:items-start ">
          <p className="hidden text-sm text-desc md:block">
            {`${data?.length} Public Playlists`}
          </p>
        </div>
      </div>
    </div>
  )
}
