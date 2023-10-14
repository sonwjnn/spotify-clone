'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import useAuthModal from '@/hooks/useAuthModal'
import useLoadImage from '@/hooks/useLoadImage'
import useSubscribeModal from '@/hooks/useSubscribeModal'
import { useUser } from '@/hooks/useUser'
import { MusicNote } from '@/public/icons'
import useHeader from '@/stores/useHeader'
import type { Playlist } from '@/types/types'
import { buckets } from '@/utils/constants'

import PlayButton from './PlayButton'

interface PlaylistRecommendProps {
  data: Playlist
  index: number
  isHover: boolean
  setHover: React.Dispatch<React.SetStateAction<boolean>>
}
const PlaylistRecommend: React.FC<PlaylistRecommendProps> = ({
  data,
  isHover,
  setHover,
}) => {
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
      className="group relative flex cursor-pointer items-center gap-x-4 overflow-hidden rounded-md bg-neutral-100/10 transition hover:bg-neutral-100/20 "
      onMouseEnter={handleHover}
      onMouseLeave={() => setBgColor(bgBase)}
      onClick={onClick}
    >
      <div className="relative min-h-[80px] min-w-[80px] shadow-base">
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
          <div className="absolute inset-0 flex items-center justify-center bg-neutral-800 text-white">
            <MusicNote size={25} />
          </div>
        )}
      </div>
      <p className="truncate py-5 text-base font-bold text-white">
        {data.title}
      </p>

      <div className="absolute right-4">
        <PlayButton className="translate-y-0" />
      </div>
    </div>
  )
}

export default PlaylistRecommend
