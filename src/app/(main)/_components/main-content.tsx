'use client'

import { SongCard } from '@/components/song-card'
import { useMainLayout } from '@/store/use-main-layout'
import { useOnPlay } from '@/hooks/use-on-play'
import type { Song } from '@/types/types'

type MainContentProps = {
  songs: Song[]
}

export const MainContent = ({ songs }: MainContentProps) => {
  const onPlay = useOnPlay(songs)
  const { width, quantityCol } = useMainLayout()

  const columnWidth = (width - 2 * 24 - (quantityCol - 1) * 24) / quantityCol

  if (songs.length === 0) {
    return <div className="mt-4 text-neutral-400">No songs avalable.</div>
  }

  return (
    <div
      className={` mt-4 grid gap-4 `}
      style={{
        gridTemplateColumns: `repeat(${quantityCol}, minmax(0,1fr))`,
        columnWidth,
      }}
    >
      {songs.map(item => (
        <SongCard
          key={item.id}
          onClick={(id: string) => onPlay(id)}
          data={item}
        />
      ))}
    </div>
  )
}
