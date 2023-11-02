'use client'

import Image from 'next/image'
import { useCallback } from 'react'
import { FiEdit2 } from 'react-icons/fi'

import { useAuthModal } from '@/hooks/modals/use-auth-modal'
import { usePlaylistModal } from '@/hooks/modals/use-playlist-modal'
import { useSubscribeModal } from '@/hooks/modals/use-subcribe-modal'
import { useLoadImage } from '@/hooks/use-load-image'
import { useMainLayout } from '@/hooks/use-main-layout'
import { usePlaylist } from '@/hooks/use-playlist'
import { useUser } from '@/hooks/use-user'
import { MusicNote } from '@/public/icons'
import cn from '@/utils/cn'
import { buckets } from '@/utils/constants'
import { getDurationSong } from '@/utils/duration-convertor'

interface PlaylistHeaderContentProps {}
export const PlaylistHeaderContent: React.FC<
  PlaylistHeaderContentProps
> = () => {
  const { playlist: data, playlistSongs } = usePlaylist()
  const { width } = useMainLayout()
  const { user, subscription } = useUser()
  const authModal = useAuthModal()
  const uploadModal = usePlaylistModal()

  const subcribeModal = useSubscribeModal()

  const imagePath = useLoadImage(data?.image_path!, buckets.playlist_images)

  const onClick = (): void => {
    if (user?.id !== data?.user_id) return

    if (!user) {
      authModal.onOpen()
      return
    }
    if (!subscription) {
      subcribeModal.onOpen()
      return
    }

    uploadModal.onOpen()
  }

  const duration = useCallback(() => {
    return getDurationSong({ milliseconds: data?.duration_ms, type: 'long' })
  }, [playlistSongs])

  return (
    <div className="flex flex-col  items-center gap-x-5  md:flex-row md:items-end">
      <div
        className={cn(
          ` group relative flex h-[232px] w-[232px] items-center justify-center rounded-sm bg-[#282828] text-white shadow-base `,
          width <= 875 && '!h-[192px] !w-[192px]'
        )}
        onClick={onClick}
      >
        {user?.id === data?.user_id ? (
          <div className="absolute inset-0 z-10 flex cursor-pointer flex-col items-center justify-center gap-y-2 rounded-sm bg-[rgba(0,0,0,.7)] opacity-0 transition group-hover:opacity-100">
            <FiEdit2 size={36} color="#ffffff" />
            <p className="text-base text-white">Choose photo</p>
          </div>
        ) : null}
        {imagePath ? (
          <div
            className={cn(
              'relative aspect-square h-full w-full overflow-hidden rounded-sm'
            )}
          >
            <Image
              className="
            object-cover
          "
              src={imagePath}
              fill
              alt="playlist image"
              sizes="100%"
              priority={true}
              blurDataURL={imagePath}
              placeholder="blur"
            />
          </div>
        ) : (
          <MusicNote size={50} />
        )}
      </div>
      <div className="mt-4 flex  flex-col gap-y-3 md:mt-0 md:gap-y-6">
        <p className="hidden text-base text-white  md:block">Playlist</p>
        <div
          onClick={onClick}
          className={cn(
            'line-clamp-3 text-center text-7xl font-bold text-white md:text-left',
            user?.id === data?.user_id && 'cursor-pointer hover:underline',
            width <= 1012 && '!text-5xl',
            width <= 901 && '!text-3xl'
          )}
        >
          {data?.title || 'Playlist Title'}
        </div>
        <div className="flex flex-col items-center gap-y-2 md:items-start ">
          {data?.description && (
            <p className="hidden text-sm text-desc md:block">
              {data.description}
            </p>
          )}
          <div className="flex gap-x-2 text-sm text-white">
            <p>{`${data?.users?.full_name || 'No name'} - ${
              data?.likes || 0
            } likes - ${playlistSongs?.length} songs
            `}</p>
            <p className="text-desc">{`${duration()}`}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
