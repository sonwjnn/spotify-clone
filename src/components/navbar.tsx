'use client'

import { usePalette } from 'color-thief-react'
import Link from 'next/link'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx'
import { twMerge } from 'tailwind-merge'

import { useAuthModal } from '@/hooks/modals/use-auth-modal'
import { useHeader } from '@/store/use-header'
import { useLoadImage } from '@/hooks/use-load-image'
import { useMainLayout } from '@/store/use-main-layout'
import { useNavbar } from '@/store/use-navbar'
import { useOnPlay } from '@/hooks/use-on-play'
import { usePlayer } from '@/store/use-player'
import { useSelectedPlayer } from '@/store/use-selected-player'
import { useUser } from '@/hooks/use-user'
import type { IconProps } from '@/public/icons'
import { HomeIcon, SearchIcon } from '@/public/icons'
import type { Playlist, Song } from '@/types/types'
import { buckets } from '@/utils/constants'

import { PlayButton } from './play-button'
import { PremiumButton } from './premium-button'
import { Button } from './ui/button'
import { UserDropdown } from './user-dropdown'

interface NavbarProps {
  type?:
    | 'default'
    | 'home'
    | 'section'
    | 'search'
    | 'artist'
    | 'genre'
    | 'playlist'
    | 'user'
  songs?: Song[]
  className?: string
  darker?: boolean
  data?: Playlist
  bgColor?: string
  hasPlayBtn?: boolean
  hasUsername?: boolean
  title?: string
  showTitle?: boolean
}

export const Navbar: React.FC<NavbarProps> = props => {
  const {
    type = 'default',
    songs,
    className,
    data,
    darker = true,
    bgColor,
    hasPlayBtn = false,
    hasUsername = false,
  } = props

  const router = useRouter()
  const authModal = useAuthModal()
  const { user, userDetails } = useUser()
  const player = usePlayer()
  const params = useParams()

  const { bgColor: bgColorHome } = useHeader()
  const { opacity, playBtnVisible, usernameVisible } = useNavbar()
  const { setSelected } = useSelectedPlayer()
  const { width } = useMainLayout()

  const pathname = usePathname()

  const onPlay = useOnPlay(songs as Song[])
  const [isPlaying, setPlaying] = useState(false)
  const [bgColorUser, setBgColorUser] = useState<string>('#171717')

  const imageUrl = useLoadImage(userDetails?.avatar_url || '', buckets.users)

  const { data: dataColor } = usePalette(imageUrl as string, 10, 'hex', {
    crossOrigin: 'Anonymous',
    quality: 100,
  })

  const routes = useMemo(
    () => [
      {
        icon: HomeIcon,
        label: 'Home',
        active: pathname === '/',
        href: '/',
      },
      {
        icon: SearchIcon,
        label: 'Search',
        active: pathname.includes('/search'),
        href: '/search',
      },
    ],
    [pathname]
  )

  useEffect(() => {
    if (
      type === 'playlist' &&
      player.playlistPlayingId?.toString() === params.id
    ) {
      setPlaying(player.isPlaying)
    }
  }, [type, player.isPlaying, player.playlistPlayingId, params.id])

  useEffect(() => {
    if (dataColor) {
      setBgColorUser(dataColor?.[2] ?? '#e0e0e0')
    }
  }, [dataColor])

  const handleClickPlay = (): void => {
    if (player.playlistPlayingId?.toString() !== params.id && songs?.length) {
      player.setPlaylistActiveId(params.id as string)
      if (songs[0]) onPlay(songs[0].id)
    } else {
      setSelected(true)
      player.handlePlay()
    }
  }

  return (
    <div
      className={twMerge(
        `absolute left-0 right-0 top-0 z-50  h-16 rounded-t-lg`,
        className
      )}
    >
      <div
        className={twMerge(
          `absolute left-0 top-0 h-full rounded-t-lg  ${
            darker && 'brightness-50'
          }  right-0 z-10`
        )}
        style={{
          transition: 'background-color 1s ease',
          opacity,
          backgroundColor:
            // eslint-disable-next-line no-nested-ternary
            type === 'home'
              ? bgColorHome
              : type === 'user'
                ? bgColorUser
                : bgColor || data?.bg_color,
        }}
      ></div>

      <div
        className={` absolute inset-x-0 top-0 z-10 mb-4 flex  h-full w-full  items-center justify-between  px-6`}
      >
        <div className="hidden min-w-0 items-center gap-x-2  md:flex ">
          <button
            className="items-center justify-center rounded-full bg-black transition active:scale-95 disabled:cursor-not-allowed disabled:select-none"
            onClick={() => router.back()}
          >
            <RxCaretLeft className="text-white" size={35} />
          </button>
          <button
            className="items-center justify-center rounded-full bg-black transition active:scale-95"
            onClick={() => router.forward()}
          >
            <RxCaretRight className="text-white" size={35} />
          </button>

          {playBtnVisible && hasPlayBtn ? (
            <div
              className={`ml-1  flex w-full min-w-0 max-w-[400px] grow items-center gap-x-2 transition ${
                playBtnVisible ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <PlayButton
                className="h-12 w-12  translate-y-0 opacity-100 hover:scale-105"
                onClick={handleClickPlay}
                isPlaying={isPlaying}
              />

              <span className="mr-1 truncate text-2xl font-bold text-white">
                {data?.title}
              </span>
            </div>
          ) : null}

          {type === 'user' && hasUsername && usernameVisible ? (
            <span
              className={`mr-1 truncate text-2xl font-bold text-white transition ${
                usernameVisible ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {userDetails?.full_name}
            </span>
          ) : null}
        </div>

        <div className="flex items-center gap-x-2 md:hidden ">
          {routes.map((item, index) => {
            const Icon:
              | ((props: Partial<IconProps>) => JSX.Element)
              | undefined = item.icon
            return (
              <Link
                key={index}
                href={item.href}
                className={twMerge(
                  `flex h-10 w-10 items-center justify-center rounded-full bg-white p-2 transition hover:opacity-75`
                )}
              >
                {Icon ? (
                  <Icon
                    size={22}
                    color="#000000"
                    className="animate-none"
                    active={item.active ? true : false}
                  />
                ) : null}
              </Link>
            )
          })}
        </div>

        <div className="flex items-center justify-between   gap-x-4">
          {user ? (
            <div className="flex items-center gap-x-4">
              {width >= 459 && <PremiumButton />}

              <UserDropdown url={imageUrl || ''} />
            </div>
          ) : (
            <>
              <div>
                <Button
                  className="bg-transparent text-sm font-medium text-neutral-300"
                  onClick={authModal.onOpen}
                >
                  Sign up
                </Button>
              </div>
              <div>
                <Button
                  className="bg-white px-5 py-2 text-sm"
                  onClick={authModal.onOpen}
                >
                  Log in
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
