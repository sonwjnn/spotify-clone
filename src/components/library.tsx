'use client'

import { HiArrowLeft, HiArrowRight } from 'react-icons/hi'

import { useAuthModal } from '@/hooks/use-auth-modal'
import { useSubscribeModal } from '@/hooks/use-subcribe-modal'
import { useUser } from '@/hooks/use-user'
import { LibraryActiveIcon, LibraryIcon } from '@/public/icons'
import { useSidebar } from '@/stores/use-sidebar'
import { useUserStore } from '@/stores/use-user-store'
import type { Playlist } from '@/types/types'
import cn from '@/utils/cn'

import { CollapseList } from './collapse-list'
import { ListItem } from './list-item'
import PlaylistSidebar from './playlist-sidebar/playlist-sidebar'
import { Tooltip } from './ui/tooltip'
import { UploadDropdown } from './upload-dropdown'

interface LibraryProps {
  playlists: Playlist[]
  isScroll?: boolean
}

export const Library: React.FC<LibraryProps> = ({
  playlists,
  isScroll = false,
}) => {
  const { user, subscription } = useUser()
  const { likedSongs, likedPlaylists } = useUserStore()
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
          `sticky top-0 z-10 flex flex-col items-center bg-neutral-900 px-5 pb-0 pt-4`,
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
              <div className="  pl-1 text-neutral-400 transition group-hover:text-white ">
                {isCollapsed ? <LibraryActiveIcon /> : <LibraryIcon />}
              </div>
              {!isCollapsed && (
                <p className=" select-none truncate pl-1 text-base font-bold text-neutral-400 transition group-hover:text-white">
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
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-neutral-400 transition hover:bg-neutral-800 hover:text-white"
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
                className="rounded-full border border-transparent bg-neutral-800 px-3 py-1 text-sm text-white  transition hover:brightness-110 disabled:opacity-50"
              >
                Playlists
              </button>
              <button
                disabled
                className=" rounded-full border border-transparent bg-neutral-800 px-3 py-1 text-sm text-white transition  hover:brightness-110 disabled:select-none disabled:opacity-50"
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
              <PlaylistSidebar
                data={playlists}
                likedPlaylist={likedPlaylists}
              />
              <div className="px-3 pb-2">
                <ListItem
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
