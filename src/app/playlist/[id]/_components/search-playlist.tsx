'use client'

import { useSessionContext } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'

import { MediaList } from '@/components/media-list'
import { Input } from '@/components/ui/input'
import { useDebounce } from '@/hooks/use-debounce'
import { useMainLayout } from '@/store/use-main-layout'
import { usePlaylist } from '@/store/use-playlist'
import { SearchIcon } from '@/public/icons'
import type { Song } from '@/types/types'

interface SearchPlaylistProps {}

export const SearchPlaylist: React.FC<SearchPlaylistProps> = () => {
  const { width } = useMainLayout()

  const { playlistSongs } = usePlaylist()

  const { supabaseClient } = useSessionContext()

  const [value, setValue] = useState<string>('')
  const [songs, setSongs] = useState<Song[]>([])
  const debouncedValue = useDebounce<string>(value, 500)

  useEffect(() => {
    const fetchDataByTitle: () => Promise<void> = async () => {
      if (!debouncedValue) {
        setSongs([])
        return
      }
      const { data, error } = await supabaseClient
        .from('songs')
        .select('*')
        .ilike('title', `%${debouncedValue}%`)
        .order('created_at', { ascending: false })
      if (error) {
        console.log(error)
      }
      if (data) {
        const playlistSongIds = playlistSongs.map(item => item.id)
        const unplaylistSongs = data.filter(
          song => !playlistSongIds.includes(song.id)
        )

        setSongs(unplaylistSongs as Song[])
      }
    }

    fetchDataByTitle()
  }, [debouncedValue, supabaseClient, playlistSongs])

  return (
    <>
      <div className="mb-4 px-6">
        <div className='relative mt-2 line-clamp-2 w-full  py-6 text-3xl font-semibold text-zinc-600 before:absolute  before:left-0 before:top-0 before:h-[1px] before:w-full before:bg-neutral-800  before:content-[""] dark:text-white'>
          Lets find content for your playlist !
        </div>
        <Input
          placeholder={'Search for your song to want to listen to !'}
          value={value}
          onChange={e => setValue(e.target.value)}
          className={`w-[40%] rounded-full bg-zinc-300 px-4 pl-10 text-zinc-500 placeholder:text-zinc-500 dark:bg-neutral-800 ${
            width <= 780 && 'w-[60%]'
          } ${width <= 550 && 'w-full'}`}
          startIcon={
            <SearchIcon size={18} className="text-zinc-600 dark:text-white" />
          }
        />
      </div>

      <MediaList type="search" songs={songs} hasAddTrackBtn />
    </>
  )
}
