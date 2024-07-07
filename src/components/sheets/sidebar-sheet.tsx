import { usePathname } from 'next/navigation'
import { useMemo, useState } from 'react'
import type { IconType } from 'react-icons'
import { HomeIcon, IconProps, LibraryIcon, SearchIcon } from '@/public/icons'
import { Box } from '@/components/ui/box'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { UploadDropdown } from '@/components/upload-dropdown'
import { PlaylistList } from '@/components/sidebar/library/playlist-list'
import { LikedItem } from '@/components/sidebar/library/liked-item'
import { useUser } from '@/hooks/use-user'
import { useUserStore } from '@/store/use-user-store'
import { useAuthModal } from '@/store/modals/use-auth-modal'
import { useSubscribeModal } from '@/store/modals/use-subcribe-modal'
import Link from 'next/link'
import { Sheet, SheetContent } from '../ui/sheet'
import { useSidebarSheet } from '@/store/use-sidebar-sheet'

type NavItemProps = {
  icon: IconType
  label: string
  active?: boolean
  href: string
}

export const SidebarSheet = () => {
  const { user, subscription } = useUser()
  const { playlists, likedSongs, likedPlaylists } = useUserStore()

  const { isOpen, onClose } = useSidebarSheet()
  const authModal = useAuthModal()
  const subcribeModal = useSubscribeModal()
  const pathname = usePathname()

  const [isScroll, setScroll] = useState<boolean>(false)

  const routes = useMemo(
    () => [
      {
        icon: HomeIcon as IconType,
        label: 'Home',
        active: pathname === '/',
        href: '/',
      },
      {
        icon: SearchIcon as IconType,
        label: 'Search',
        active: pathname.includes('/search'),
        href: '/search',
      },
    ],
    [pathname]
  )

  const handleClick = (): void => {
    if (!user) {
      authModal.onOpen()
      return
    }
    if (!subscription) {
      subcribeModal.onOpen()
    }
  }

  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>): void => {
    const yAxis = e.currentTarget.scrollTop
    if (yAxis) {
      setScroll(true)
    } else {
      setScroll(false)
    }
  }

  const handleClose = () => {
    onClose()
  }

  return (
    <Sheet open={isOpen} onOpenChange={handleClose}>
      <SheetContent side="left" className="flex gap-0 p-0">
        <aside
          className={`group/sidebar relative flex h-full w-full flex-col overflow-y-auto bg-secondary`}
        >
          <div className="flex h-full flex-col gap-y-2 bg-white p-2  dark:bg-black">
            <Box>
              <div className="flex flex-col gap-y-4 px-5 py-4">
                {routes.map(item => (
                  <div className="h-full w-full" key={item.label}>
                    <StaticNavItem {...item} />
                  </div>
                ))}
              </div>
            </Box>

            <ScrollArea
              className="h-full w-full rounded-lg bg-[#F1F2F4] dark:bg-neutral-900"
              onScroll={handleScroll}
            >
              <div className="flex flex-col ">
                <div
                  className={cn(
                    `sticky top-0 z-10 flex flex-col items-center bg-[#F1F2F4] px-5 pb-0 pt-4 dark:bg-neutral-900`,
                    isScroll && 'shadow-2xl'
                  )}
                >
                  <div
                    className={`flex h-8 w-full items-center justify-between `}
                  >
                    <div className="group flex cursor-pointer gap-x-2 ">
                      <div className="  pl-1 text-zinc-700 transition group-hover:text-zinc-600 dark:text-neutral-400 dark:group-hover:text-white">
                        <LibraryIcon />
                      </div>
                      <p className=" select-none truncate pl-1 text-base font-bold text-zinc-700 transition group-hover:text-zinc-600 dark:text-neutral-400 dark:group-hover:text-white">
                        Your Library
                      </p>
                    </div>

                    <div className={'flex flex-row justify-end gap-x-2'}>
                      <UploadDropdown />
                    </div>
                  </div>
                  <div className="mt-2 flex h-12 w-full items-center gap-x-2">
                    <button
                      disabled={!playlists.length}
                      className="rounded-full border border-transparent bg-zinc-600 px-3 py-1 text-sm text-white transition  hover:brightness-110 disabled:opacity-50 dark:bg-neutral-800"
                    >
                      Playlists
                    </button>
                    <button
                      disabled
                      className=" rounded-full border border-transparent bg-zinc-600 px-3 py-1 text-sm text-white transition hover:brightness-110  disabled:select-none disabled:opacity-50 dark:bg-neutral-800"
                    >
                      Albums
                    </button>
                  </div>
                </div>

                {/* eslint-disable-next-line no-nested-ternary */}
                {!user || !subscription ? (
                  <div
                    onClick={handleClick}
                    className=" my-8 line-clamp-2 flex w-full cursor-pointer items-center justify-center px-4 text-center text-neutral-400 transition hover:text-white"
                  >
                    Log in and subscribe to view your playlists.
                  </div>
                ) : !playlists.length && !likedPlaylists.length ? (
                  <div
                    onClick={handleClick}
                    className={` my-8 line-clamp-2 flex w-full cursor-pointer items-center justify-center px-4 text-center text-neutral-400 transition hover:text-white`}
                  >
                    You have no any playlists, create your playlists.
                  </div>
                ) : (
                  <>
                    <PlaylistList data={[...playlists, ...likedPlaylists]} />
                    <div className="px-3 pb-2">
                      <LikedItem
                        image="/images/liked.png"
                        name="Liked Songs"
                        href="/liked"
                        count={likedSongs.length}
                      />
                    </div>
                  </>
                )}
              </div>
            </ScrollArea>
          </div>
        </aside>
      </SheetContent>
    </Sheet>
  )
}

export const StaticNavItem = ({ icon, label, active, href }: NavItemProps) => {
  const Icon: ((props: Partial<IconProps>) => JSX.Element) | undefined = icon

  return (
    <Link
      href={href}
      className={cn(
        `flex h-auto w-full cursor-pointer flex-row items-center gap-x-4 py-1 pl-1 text-base font-bold text-zinc-700 transition dark:text-neutral-400 dark:hover:text-white`,
        active && 'text-green-600 dark:text-white'
      )}
    >
      <div className="h-6 w-6">
        {Icon ? (
          <Icon
            className={`${active ? 'animate-spin-once' : null}`}
            active={active ? true : false}
          />
        ) : null}
      </div>

      <p className="w-full truncate">{label}</p>
    </Link>
  )
}
