import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import type { Song } from '@/types/types'

export interface PlayOptions {
  id?: string
  forceSoundEnabled?: boolean
  playbackRate?: number
}
export declare type PlayFunction = (options?: PlayOptions) => void

interface PlayerStore {
  ids: string[]
  activeId?: string
  isPlaying: boolean
  isRandom: boolean
  isReplay: boolean
  volume: number
  currentTime: number
  currentTrack: Song | undefined
  playlistPlayingId?: string
  queue: Song[]
  currentTrackIndex: number
  nextTrackIndex: number
  setCurrentTrackIndex: (index: number) => void
  setNextTrackIndex: (index: number) => void
  setQueue: (songs: Song[]) => void
  setPlaylistActiveId: (id: string | undefined) => void
  setVolume: (volumn: number) => void
  setPlaying: (isPlaying: boolean) => void
  setRandom: (isRandom: boolean) => void
  setReplay: (isReplay: boolean) => void
  setId: (id: string) => void
  setIds: (ids: string[]) => void
  setCurrentTime: (currentTime: number) => void
  setCurrentTrack: (song: Song | undefined) => void
  calNextTrackIndex: () => void
  handlePlay: () => void
  setHandlePlay: (play: () => void, pause: (id?: string) => void) => void
  reset: () => void
}

export const usePlayer = create<PlayerStore>()(
  persist(
    (set, get) => ({
      ids: [],
      activeId: undefined,
      isPlaying: false,
      isRandom: false,
      isReplay: false,
      volume: 0.5,
      currentTime: 0,
      currentTrack: undefined,
      playlistPlayingId: undefined,
      queue: [],
      currentTrackIndex: 0,
      nextTrackIndex: 0,
      handlePlay: () => {},
      setCurrentTrackIndex: (index: number) =>
        set({ currentTrackIndex: index }),
      setNextTrackIndex: (index: number) => set({ nextTrackIndex: index }),
      setQueue: (songs: Song[]) => set({ queue: songs }),
      setPlaylistActiveId: (id: string | undefined) =>
        set({ playlistPlayingId: id }),
      setId: (id: string) => set({ activeId: id }),
      setIds: (ids: string[]) => set({ ids }),
      reset: () => set({ ids: [], activeId: undefined }),
      setVolume: (volume: number) => set({ volume }),
      setPlaying: (isPlaying: boolean) => set({ isPlaying }),
      setRandom: (isRandom: boolean) => set({ isRandom }),
      setReplay: (isReplay: boolean) => set({ isReplay }),
      setCurrentTime: (currentTime: number) => set({ currentTime }),
      setCurrentTrack: (song: Song | undefined) => set({ currentTrack: song }),
      calNextTrackIndex: () => {
        const {
          isRandom,
          currentTrackIndex,
          queue,
          setNextTrackIndex,
          currentTrack,
        } = get()

        const len = queue?.length ? queue?.length : 0

        if (isRandom) {
          let randomIndex = currentTrackIndex
          while (randomIndex === currentTrackIndex) {
            randomIndex = Math.floor(Math.random() * len)
          }
          setNextTrackIndex(randomIndex)
        } else if (
          (currentTrackIndex >= len - 1 && currentTrack) ||
          queue.length < 2
        ) {
          setNextTrackIndex(0)
        } else if (queue.length >= 2) {
          setNextTrackIndex(currentTrackIndex + 1)
        }
      },
      setHandlePlay: (play: PlayFunction, pause: (id?: string) => void) => {
        set({
          handlePlay: () => {
            if (!get().isPlaying) {
              play()
            } else {
              pause()
            }
          },
        })
      },
    }),
    {
      name: 'player-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)
