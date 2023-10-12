import { usePathname } from 'next/navigation'

import usePlayer from '@/stores/usePlayer'
import useSelectedPlayer from '@/stores/useSelectedPlayer'
import type { Song } from '@/types/types'

import useAuthModal from './useAuthModal'
import useSubscribeModal from './useSubscribeModal'
import { useUser } from './useUser'

const useOnPlay = (songs: Song[]): ((id: string) => void) => {
  const {
    setId,
    setCurrentTrackIndex,
    setCurrentTrack,
    setQueue,
    calNextTrackIndex,
    setPlaylistActiveId,
    setIds,
  } = usePlayer()

  const pathName = usePathname()

  const { setSelected } = useSelectedPlayer()

  const authModal = useAuthModal()

  const subcribeModal = useSubscribeModal()

  const { user, subscription } = useUser()

  const onPlay = (id: string): void => {
    if (!user) {
      authModal.onOpen()
      return
    }

    if (!subscription) {
      subcribeModal.onOpen()
      return
    }

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
      return false
    })

    setCurrentTrack(currentTrack)
    setQueue(songs)
    calNextTrackIndex()
    setIds(songs.map(item => item.id))
  }

  return onPlay
}

export default useOnPlay
