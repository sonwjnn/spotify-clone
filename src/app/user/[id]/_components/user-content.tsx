'use client'

import { usePalette } from 'color-thief-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { useUser } from '@/hooks/use-user'
import { SingleMusicNote } from '@/public/icons'
import { useUserStore } from '@/stores/use-user-store'
import type { Playlist } from '@/types/types'

interface UserContentProp {
  playlists: Playlist[]
}

export const UserContent: React.FC<UserContentProp> = ({ playlists }) => {
  const router = useRouter()
  const { likedSongs: songs } = useUserStore()
  const { isLoading, user } = useUser()

  const [bgColorUser, setBgColorUser] = useState<string>('')

  const imageUrl = user?.user_metadata.avatar_url

  const { data: dataColor } = usePalette(imageUrl as string, 10, 'hex', {
    crossOrigin: 'Anonymous',
    quality: 100,
  })

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/')
    }
  }, [isLoading, user, router])

  useEffect(() => {
    if (dataColor) {
      setBgColorUser(dataColor?.[2] ?? '#e0e0e0')
    }
  }, [dataColor])

  if (!songs.length) {
    return (
      <div
        className=" header-bg-img-md flex h-[40vh] w-full flex-col items-center justify-center gap-y-4 px-5 pt-8 text-white"
        style={{
          background: bgColorUser,
        }}
      >
        <div>
          <SingleMusicNote size={70} />
        </div>
        <h1 className="text-[32px] font-bold">
          Songs you like will appear here
        </h1>
        <p className="text-base font-semibold">
          Save songs by tapping the heart icon.
        </p>
        <Button
          onClick={() => router.push('/search')}
          className="w-[150px] bg-white px-6 py-2"
        >
          Find songs
        </Button>
      </div>
    )
  }

  return (
    <>
      <div className="relative flex w-full gap-x-6 p-5 px-10">
        <div
          style={{ backgroundColor: bgColorUser }}
          className="header-bg-img-md absolute inset-x-0 top-0 z-0 h-[232px]"
        ></div>
        <div className="h-14 w-14 translate-y-0 opacity-100"></div>
      </div>
    </>
  )
}
