'use client'

import { useSupabaseClient } from '@supabase/auth-helpers-react'
import Link from 'next/link'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-hot-toast'
import { FaUserAlt } from 'react-icons/fa'
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx'
import { twMerge } from 'tailwind-merge'

import { useAuthModal } from '@/hooks/use-auth-modal'
import { useOnPlay } from '@/hooks/use-on-play'
import { useUser } from '@/hooks/use-user'
import type { IconProps } from '@/public/icons'
import {
  HomeActiveIcon,
  HomeIcon,
  SearchActiveIcon,
  SearchIcon,
} from '@/public/icons'
import { useHeader } from '@/stores/use-header'
import { usePlayer } from '@/stores/use-player'
import { useSelectedPlayer } from '@/stores/use-selected-player'
import { useStyleNavbar } from '@/stores/use-style-navbar'
import type { Playlist, Song } from '@/types/types'

import { PlayButton } from './play-button'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Tooltip } from './ui/tooltip'

interface NavbarProps {
  type?:
    | 'default'
    | 'home'
    | 'section'
    | 'search'
    | 'artist'
    | 'genre'
    | 'playlist'
  songs?: Song[]
  className?: string
  darker?: boolean
  data?: Playlist
  bgColor?: string
  hasPlayBtn?: boolean
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
  } = props

  const router = useRouter()
  const authModal = useAuthModal()
  const { user } = useUser()
  const player = usePlayer()
  const params = useParams()

  const { bgColor: bgColorHome } = useHeader()
  const { opacity, playBtnVisible } = useStyleNavbar()
  const { setSelected } = useSelectedPlayer()

  const supabaseClient = useSupabaseClient()

  const pathname = usePathname()

  const onPlay = useOnPlay(songs as Song[])
  const [isPlaying, setPlaying] = useState(false)

  const routes = useMemo(
    () => [
      {
        icon: [HomeActiveIcon, HomeIcon],
        label: 'Home',
        active: pathname !== '/search',
        href: '/',
      },
      {
        icon: [SearchActiveIcon, SearchIcon],
        label: 'Search',
        active: pathname === '/search',
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

  const handleClickPlay = (): void => {
    if (player.playlistPlayingId?.toString() !== params.id && songs?.length) {
      player.setPlaylistActiveId(params.id as string)
      if (songs[0]) onPlay(songs[0].id)
    } else {
      setSelected(true)
      player.handlePlay()
    }
  }

  const handleLogout = async (): Promise<void> => {
    const { error } = await supabaseClient.auth.signOut()
    player.reset()
    router.refresh()

    if (error) {
      toast.error(error.message)
    } else {
      toast.success('Logged out!')
    }
  }
  return (
    <div
      className={twMerge(
        `absolute top-0 right-0 left-0 h-16  rounded-t-lg z-50`,
        className
      )}
    >
      <div
        className={twMerge(
          `rounded-t-lg absolute top-0 h-full left-0  ${
            darker && 'brightness-50'
          }  right-0 z-10`
        )}
        style={{
          transition: 'background-color 1s ease',
          opacity,
          backgroundColor:
            type === 'home' ? bgColorHome : bgColor || data?.bg_color,
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
        </div>

        <div className="flex items-center gap-x-2 md:hidden ">
          {routes.map((item, index) => {
            const Icon:
              | ((props: Partial<IconProps>) => JSX.Element)
              | undefined = item.active ? item.icon[0] : item.icon[1]
            return (
              <Link
                key={index}
                href={item.href}
                className={twMerge(
                  `flex rounded-full w-10 h-10 bg-white p-2 items-center justify-center hover:opacity-75 transition`
                )}
              >
                {Icon ? <Icon size={22} color="#000000" /> : null}
              </Link>
            )
          })}
        </div>

        <div className="flex items-center justify-between   gap-x-4">
          {user ? (
            <div className="flex items-center gap-x-4">
              <Button onClick={handleLogout} className="bg-white px-6 py-2">
                Logout
              </Button>

              <Tooltip text={`${user.user_metadata.full_name || ''}`}>
                <div className="rounded-full bg-transparent p-0 hover:scale-105 active:scale-100">
                  <Avatar
                    onClick={() => router.push('/account')}
                    className="cursor-pointer bg-white"
                  >
                    <AvatarImage src={`${user.user_metadata.avatar_url}`} />
                    <AvatarFallback>
                      <FaUserAlt />
                    </AvatarFallback>
                  </Avatar>
                </div>
              </Tooltip>
            </div>
          ) : (
            <>
              <div>
                <Button
                  className="bg-transparent font-medium text-neutral-300"
                  onClick={authModal.onOpen}
                >
                  Sign up
                </Button>
              </div>
              <div>
                <Button
                  className="bg-white px-6 py-2"
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
