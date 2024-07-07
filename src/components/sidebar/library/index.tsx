'use client'

import { HiArrowLeft, HiArrowRight } from 'react-icons/hi'

import { useAuthModal } from '@/store/modals/use-auth-modal'
import { useSubscribeModal } from '@/store/modals/use-subcribe-modal'
import { useSidebar } from '@/store/use-sidebar'
import { useUser } from '@/hooks/use-user'
import { useUserStore } from '@/store/use-user-store'
import { LibraryActiveIcon, LibraryIcon } from '@/public/icons'
import { cn } from '@/lib/utils'

import { CollapseList } from '@/components/collapse-list'
import { Tooltip } from '@/components/ui/tooltip'
import { UploadDropdown } from '@/components/upload-dropdown'
import { LikedItem } from '@/components/sidebar/library/liked-item'
import { PlaylistList } from '@/components/sidebar/library/playlist-list'

type LibraryProps = {
  isScroll?: boolean
}

export const Library = ({ isScroll = false }: LibraryProps) => {
  const { user, subscription } = useUser()
  const { playlists, likedSongs, likedPlaylists } = useUserStore()
  const { isCollapsed, isMaxWidth, collapsed, resetMinWidth, resetMaxWidth } =
    useSidebar()
  const authModal = useAuthModal()
  const subcribeModal = useSubscribeModal()

  const handleClick = (): void => {
    if (!user) {
      authModal.onOpen()
      return
    }
    if (!subscription) {
      subcribeModal.onOpen()
    }
  }

  const handleScale = (): void => {
    if (isCollapsed) {
      resetMinWidth()
    } else {
      collapsed()
    }
  }

  const handleShowMore = (): void => {
    if (isMaxWidth) {
      resetMinWidth()
    } else {
      resetMaxWidth()
    }
  }

  return (
    <div className="flex flex-col ">
      <div
        className={cn(
          `sticky top-0 z-10 flex flex-col items-center bg-[#F1F2F4] px-5 pb-0 pt-4 dark:bg-neutral-900`,
          {
            'shadow-2xl': isScroll,
            'pb-3': isCollapsed,
          }
        )}
      >
        <div className={`flex h-8 w-full items-center justify-between `}>
          <Tooltip
            text={`${
              isCollapsed ? 'Expend your library' : 'Collapse your library'
            }`}
            side={isCollapsed ? 'right' : 'top'}
          >
            <div
              className="group flex cursor-pointer gap-x-2 "
              onClick={handleScale}
            >
              <div className="  pl-1 text-zinc-700 transition group-hover:text-zinc-600 dark:text-neutral-400 dark:group-hover:text-white">
                {isCollapsed ? <LibraryActiveIcon /> : <LibraryIcon />}
              </div>
              {!isCollapsed && (
                <p className=" select-none truncate pl-1 text-base font-bold text-zinc-700 transition group-hover:text-zinc-600 dark:text-neutral-400 dark:group-hover:text-white">
                  Your Library
                </p>
              )}
            </div>
          </Tooltip>

          {!isCollapsed ? (
            <div className={'flex flex-row justify-end gap-x-2'}>
              {/* <Tooltip text="Create song or playlist"> */}
              <UploadDropdown />
              {/* </Tooltip> */}
              <Tooltip text={`${isMaxWidth ? 'Show less' : 'Show more'}`}>
                <div
                  onClick={handleShowMore}
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-zinc-500 transition hover:bg-zinc-700/10 hover:text-white dark:text-neutral-400 dark:hover:bg-neutral-800"
                >
                  {isMaxWidth ? (
                    <HiArrowLeft size={20} />
                  ) : (
                    <HiArrowRight size={20} />
                  )}
                </div>
              </Tooltip>
            </div>
          ) : null}
        </div>
        {!isCollapsed ? (
          <>
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
          </>
        ) : null}
      </div>

      {/* eslint-disable-next-line no-nested-ternary */}
      {!user || !subscription ? (
        <div
          onClick={handleClick}
          className={`${
            isCollapsed && 'hidden'
          } my-8 line-clamp-2 flex w-full cursor-pointer items-center justify-center px-4 text-center text-neutral-400 transition hover:text-white`}
        >
          Log in and subscribe to view your playlists.
        </div>
      ) : !playlists.length && !likedPlaylists.length ? (
        <div
          onClick={handleClick}
          className={`${
            isCollapsed && 'hidden'
          } my-8 line-clamp-2 flex w-full cursor-pointer items-center justify-center px-4 text-center text-neutral-400 transition hover:text-white`}
        >
          You have no any playlists, create your playlists.
        </div>
      ) : (
        <>
          {isCollapsed ? (
            <CollapseList playlists={[...playlists, ...likedPlaylists]} />
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
        </>
      )}
    </div>
  )
}
