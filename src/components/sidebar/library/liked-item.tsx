'use client'

import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'

import { useUser } from '@/hooks/use-user'
import { MusicNote } from '@/public/icons'
import { cn } from '@/lib/utils'

type LikedItemProps = {
  image: string
  name: string
  href: string
  count?: number
}

export const LikedItem = ({ image, name, href, count }: LikedItemProps) => {
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
              'bg-neutral-800 bg-zinc-700/20 hover:bg-neutral-700 hover:bg-zinc-700/30 active:bg-zinc-700/40 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:active:bg-neutral-800/75',
            !pathName.includes('/liked') &&
              'hover:bg-zinc-700/10 active:bg-zinc-700/20 dark:hover:bg-neutral-800/50 dark:active:bg-black'
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
              <p className="truncate text-zinc-600 dark:text-white">{name}</p>
              <p className="truncate text-sm text-zinc-500 dark:text-neutral-400">{`Playliked - ${count} songs`}</p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
