import { Song } from '@/types/types'
import useAuthModal from './useAuthModal'
import { useUser } from './useUser'
import useSubscribeModal from './useSubscribeModal'
import usePlayer from '@/stores/usePlayer'
import useSelectedPlayer from '@/stores/useSelectedPlayer'
import { usePathname } from 'next/navigation'

const useOnPlay = (songs: Song[]) => {
  const {
    setId,
    setCurrentTrackIndex,
    setCurrentTrack,
    setQueue,
    calNextTrackIndex,
    setPlaylistActiveId,
    setIds,
  } = usePlayer()
  2
  const pathName = usePathname()

  const { setSelected } = useSelectedPlayer()

  const authModal = useAuthModal()

  const subcribeModal = useSubscribeModal()

  const { user, subscription } = useUser()

  const onPlay = (id: string) => {
    if (!user) return authModal.onOpen()

    if (!subscription) return subcribeModal.onOpen()

    if (!pathName.includes('/playlist')) {
      setPlaylistActiveId(undefined)
    }

    setSelected(true)

    // handle player store
    setId(id)

    const currentTrack = songs.find((song, index) => {
      if (song.id === id) {
        setCurrentTrackIndex(index)
        return true
      }
    })

    setCurrentTrack(currentTrack)
    setQueue(songs)
    calNextTrackIndex()
    setIds(songs.map(item => item.id))
  }

  return onPlay
}

export default useOnPlay
