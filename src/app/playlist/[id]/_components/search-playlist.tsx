'use client'

import { useSessionContext } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'

import { MediaList } from '@/components/media-list'
import { Input } from '@/components/ui/input'
import { useDebounce } from '@/hooks/use-debounce'
import { SearchIcon } from '@/public/icons'
import { useMainLayout } from '@/stores/use-main-layout'
import type { Playlist, Song } from '@/types/types'

interface SearchPlaylistProps {
  songs: Song[]
  playlist: Playlist
}

export const SearchPlaylist: React.FC<SearchPlaylistProps> = ({ playlist }) => {
  const { width } = useMainLayout()

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
        const unaddedSongs = data.filter(
          song => !playlist?.song_ids?.includes(song.id)
        )
        setSongs(unaddedSongs as Song[])
      }
    }

    fetchDataByTitle()
  }, [debouncedValue, supabaseClient, playlist?.song_ids])

  return (
    <>
      <div className="mb-4 px-6">
        <div className='relative mt-2 line-clamp-2 w-full  py-6 text-3xl font-semibold text-white  before:absolute before:left-0 before:top-0 before:h-[1px] before:w-full  before:bg-neutral-800 before:content-[""]'>
          Lets find content for your playlist !
        </div>
        <Input
          placeholder={'Search for your song to want to listen to !'}
          value={value}
          onChange={e => setValue(e.target.value)}
          className={`w-[40%] rounded-full bg-neutral-800 px-4 pl-10 ${
            width <= 780 && 'w-[60%]'
          } ${width <= 550 && 'w-full'}`}
          startIcon={<SearchIcon size={18} />}
        />
      </div>

      <MediaList type="search" songs={songs} />
    </>
  )
}
