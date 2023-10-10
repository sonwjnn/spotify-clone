'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { MusicNote } from '@/public/icons'
import { Playlist } from '@/types/types'
import { buckets } from '@/utils/constants'
import useHeader from '@/stores/useHeader'
import PlayButton from './PlayButton'
import useLoadImage from '@/hooks/useLoadImage'

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
  const { bgBase, bgColor, setBgColor } = useHeader()

  const imageUrl = useLoadImage(data.image_path, buckets.playlist_images)

  const handleHover = () => {
    if (!isHover) setHover(true)

    setBgColor(data?.bg_color || bgColor)
  }
  const onClick = () => {
    // Add authentication befire push
    router.push(`playlist/${data.id}`)
  }

  return (
    <div
      className="relative group flex items-center rounded-md overflow-hidden gap-x-4 cursor-pointer bg-neutral-100/10 hover:bg-neutral-100/20 transition "
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
          <div className="absolute inset-0 flex items-center justify-center bg-neutral-800">
            <MusicNote size={25} />
          </div>
        )}
      </div>
      <p className="font-bold text-base truncate py-5">{data.title}</p>

      <div className="absolute right-4">
        <PlayButton className="translate-y-0" />
      </div>
    </div>
  )
}

export default PlaylistRecommend
