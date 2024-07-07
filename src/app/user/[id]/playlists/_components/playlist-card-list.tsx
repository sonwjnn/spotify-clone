import { PlaylistCard } from './playlist-card'
import { useMainLayout } from '@/store/use-main-layout'
import type { Playlist } from '@/types/types'

type CartListProps = {
  data: Playlist[]
}

export const PlaylistCardList = ({ data }: CartListProps): JSX.Element => {
  const { width, quantityCol } = useMainLayout()

  const columnWidth = (width - 2 * 24 - (quantityCol - 1) * 24) / quantityCol
  return (
    <div
      className={` mt-4 grid gap-4 `}
      style={{
        gridTemplateColumns: `repeat(${quantityCol}, minmax(0,1fr))`,
        columnWidth,
      }}
    >
      {data.map(item => (
        <PlaylistCard key={item.id} data={item} type="playlist" />
      ))}
    </div>
  )
}
