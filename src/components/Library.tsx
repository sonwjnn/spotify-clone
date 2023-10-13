'use client'

import useAuthModal from '@/hooks/useAuthModal'
import useSubscribeModal from '@/hooks/useSubscribeModal'
import { useUser } from '@/hooks/useUser'
import useLibraryStore from '@/stores/useLibraryStore'
import useUserStore from '@/stores/useUserStore'
import type { Playlist } from '@/types/types'

import ListColapse from './ListColapse'
import ListItem from './ListItem'
import PlaylistSidebar from './PlaylistSidebar/PlaylistSidebar'
import UploadDropdown from './UploadDropdown'

interface LibraryProps {
  playlists: Playlist[]
  isScroll?: boolean
}

const Library: React.FC<LibraryProps> = ({ playlists, isScroll = false }) => {
  const { user, subscription } = useUser()
  const { likedSongs, likedPlaylists } = useUserStore()
  const { isCollapsed } = useLibraryStore()
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

  return (
    <div className="flex flex-col ">
      <div
        className={`sticky top-0 z-10 flex flex-col items-center bg-neutral-900 px-5 pb-0 pt-4 ${
          isScroll ? 'shadow-2xl' : ''
        }`}
      >
        {!isCollapsed ? (
          <>
            <div className="flex w-full items-center justify-between">
              <div className="inline-flex items-center gap-x-2 ">
                <p className="truncate pl-10 text-base font-bold text-neutral-400">
                  Your Library
                </p>
              </div>

              <div className={'flex flex-row justify-end'}>
                <UploadDropdown />
              </div>
            </div>

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
        ) : (
          <div className="h-10"></div>
        )}
      </div>

      {/* eslint-disable-next-line no-nested-ternary */}
      {!user || !subscription ? (
        <div
          onClick={handleClick}
          className="my-8 flex w-full cursor-pointer items-center justify-center px-4 text-center text-neutral-400 transition hover:text-white"
        >
          Log in and subscribe to view your playlists.
        </div>
      ) : !playlists.length && !likedPlaylists.length ? (
        <div
          onClick={handleClick}
          className="my-8 flex w-full cursor-pointer items-center justify-center px-4 text-center text-neutral-400 transition hover:text-white"
        >
          You have no any playlists, create your playlists.
        </div>
      ) : (
        <>
          {isCollapsed ? (
            <ListColapse playlists={[...playlists, ...likedPlaylists]} />
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

export default Library
