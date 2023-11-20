import type { Playlist, Song } from './types'

export interface SongCardTagProps {
  thumbnailUrl?: string
  name?: string
  isLoading?: boolean
  id?: string
  setBgColor: React.Dispatch<React.SetStateAction<string>>
  albumId?: string
}

export interface MediaItemProps {
  isLoading?: boolean
  isExplicit?: boolean
  type?: 'default' | 'playlist' | 'album' | 'search' | 'artist' | 'queue'
  id?: string
  song: Song
  playlist?: Playlist
  isPlaying?: boolean
  index?: number
  isSelected?: boolean
  isActived?: boolean
  hasAddTrackBtn?: boolean
}

export interface MediaListProps {
  songs: Song[]
  playlist?: Playlist
  pivotTop?: number
  top?: number
  type?: 'default' | 'playlist' | 'album' | 'search' | 'artist' | 'queue'
  // albumImages?: ImageSource[]
  inclHeader?: boolean
  adjustOrder?: number
  hasAddTrackBtn?: boolean
}
