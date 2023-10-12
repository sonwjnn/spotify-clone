'use client'

import useGetSongById from '@/hooks/useGetSongById'
import useLoadSongUrl from '@/hooks/useLoadSongUrl'
import { useUser } from '@/hooks/useUser'
import usePlayer from '@/stores/usePlayer'

import Player from './Player'

const MusicPlayer: React.FC = () => {
  const player = usePlayer()

  const { song } = useGetSongById(player.activeId)

  const { user } = useUser()

  const songUrl = useLoadSongUrl(song!)

  if (!song || !songUrl || !player.activeId || !user) {
    return null
  }

  return (
    <div className="fixed bottom-0 h-[80px] w-full bg-black px-4 py-2">
      <Player key={songUrl} song={song} songUrl={songUrl} />
    </div>
  )
}

export default MusicPlayer
