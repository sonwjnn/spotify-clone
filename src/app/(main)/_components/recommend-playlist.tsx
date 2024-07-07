'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { useAuthModal } from '@/store/modals/use-auth-modal'
import { useSubscribeModal } from '@/store/modals/use-subcribe-modal'
import { useHeader } from '@/store/use-header'
import { useLoadImage } from '@/hooks/use-load-image'
import { useUser } from '@/hooks/use-user'
import { MusicNote } from '@/public/icons'
import type { Playlist } from '@/types/types'
import { buckets } from '@/utils/constants'

import { PlayButton } from '@/components/play-button'

type RecommendPlaylistProps = {
  data: Playlist
  index: number
  isHover: boolean
  setHover: React.Dispatch<React.SetStateAction<boolean>>
}
export const RecommendPlaylist = ({
  data,
  isHover,
  setHover,
}: RecommendPlaylistProps) => {
  const router = useRouter()
  const authModal = useAuthModal()
  const subscribeModal = useSubscribeModal()
  const { user, subscription } = useUser()
  const { bgBase, bgColor, setBgColor } = useHeader()

  const imageUrl = useLoadImage(data.image_path, buckets.playlist_images)

  const handleHover = (): void => {
    if (!isHover) setHover(true)

    setBgColor(data?.bg_color || bgColor)
  }
  const onClick = (): void => {
    if (!user) {
      authModal.onOpen()
      return
    }

    if (!subscription) {
      subscribeModal.onOpen()
      return
    }
    // Add authentication befire push
    router.push(`playlist/${data.id}`)
  }

  return (
    <div
      className="group relative flex cursor-pointer items-center gap-x-4 overflow-hidden rounded-md bg-neutral-100/20 transition hover:bg-neutral-100/20 dark:bg-neutral-100/10 "
      onMouseEnter={handleHover}
      onMouseLeave={() => setBgColor(bgBase)}
      onClick={onClick}
    >
      <div className="relative min-h-[64px] min-w-[64px] shadow-base">
        {imageUrl ? (
          <Image
            className="object-cover"
            fill
            src={imageUrl}
            alt="Image"
            sizes="100%"
            blurDataURL={imageUrl}
            placeholder="blur"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-zinc-300 text-white dark:bg-neutral-800">
            <MusicNote size={25} />
          </div>
        )}
      </div>
      <p className="truncate py-5 pr-2 text-base font-bold text-zinc-600 dark:text-white">
        {data.title}
      </p>

      <div className="absolute right-4">
        <PlayButton className="translate-y-0 p-[14px]" />
      </div>
    </div>
  )
}
