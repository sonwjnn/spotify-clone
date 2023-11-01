'use client'

import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'

import { useUser } from '@/hooks/use-user'
import { MusicNote } from '@/public/icons'
import cn from '@/utils/cn'

interface LikedItemProps {
  image: string
  name: string
  href: string
  count?: number
}

export const LikedItem: React.FC<LikedItemProps> = ({
  image,
  name,
  href,
  count,
}) => {
  const { user } = useUser()
  const router = useRouter()
  const pathName = usePathname()

  const onClick = (): void => {
    router.push(href)
  }

  return (
    <>
      {user ? (
        <div
          className={cn(
            ` w-full cursor-pointer rounded-md p-2 transition`,
            pathName.includes('/liked') &&
              'bg-neutral-800 active:bg-neutral-800/75 hover:bg-neutral-700',
            !pathName.includes('/liked') &&
              'active:bg-black hover:bg-neutral-800/50'
          )}
        >
          <div onClick={onClick} className="flex items-center gap-x-3">
            <div className="relative min-h-[48px] min-w-[48px] overflow-hidden rounded-md">
              {image ? (
                <Image
                  fill
                  src={image}
                  sizes="100%"
                  alt="Media-Item"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-neutral-800">
                  <MusicNote size={20} />
                </div>
              )}
            </div>
            <div className="flex flex-col gap-y-1 overflow-hidden">
              <p className="truncate text-white">{name}</p>
              <p className="truncate text-sm text-neutral-400">{`Playliked - ${count} songs`}</p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
