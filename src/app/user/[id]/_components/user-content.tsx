'use client'

import { usePalette } from 'color-thief-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { CardList } from '@/components/card-list'
import { useUser } from '@/hooks/use-user'
import { SingleMusicNote } from '@/public/icons'
import { useMainLayout } from '@/stores/use-main-layout'
import type { Playlist } from '@/types/types'

interface UserContentProp {
  data: Playlist[]
  id: string
}

export const UserContent: React.FC<UserContentProp> = ({ data, id }) => {
  const router = useRouter()
  const { isLoading, user, userDetails } = useUser()
  const [bgColorUser, setBgColorUser] = useState<string>('')
  const { quantityCol } = useMainLayout()

  const imageUrl = userDetails?.avatar_url || user?.user_metadata.avatar_url

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

  if (!data?.length) {
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
          Playlists you create will appear here
        </h1>
        <p className="text-base font-semibold">
          Create playlists by tapping the plus icon.
        </p>
      </div>
    )
  }

  const filteredPlaylists = data.slice(0, quantityCol)

  return (
    <div className="relative flex w-full flex-col px-6">
      <div
        style={{ backgroundColor: bgColorUser }}
        className="header-bg-img-md absolute inset-x-0 top-0 z-0 h-[232px]"
      ></div>
      <div className="mt-6 h-16 w-full"></div>
      <div className="z-10 flex w-full justify-between">
        <div className="cursor-pointer text-2xl font-bold text-white hover:underline">
          Public Playlists
        </div>
        <div
          onClick={() => router.push(`/user/${id}/playlists`)}
          className="cursor-pointer text-xl font-bold text-white hover:underline"
        >
          Show all
        </div>
      </div>
      <CardList data={filteredPlaylists} />
    </div>
  )
}
