import { Playlist, Song } from "./types";

export interface SongItemTagProps {
  thumbnailUrl?: string;
  name?: string;
  isLoading?: boolean;
  id?: string;
  setBgColor: React.Dispatch<React.SetStateAction<string>>;
  albumId?: string;
}

export interface MediaItemProps {
  // artists?: ArtistData[]
  isLoading?: boolean;
  // albumData?: SpotifyAlbum
  isExplicit?: boolean;
  type?: "default" | "playlist" | "album" | "search" | "artist";
  id?: string;
  song: Song;
  playlist?: Playlist;
  isPlaying?: boolean;
  index?: number;
  selectedId?: string;
}

export interface MediaListProps {
  songs: Song[];
  playlist?: Playlist;
  pivotTop?: number;
  top?: number;
  type?: "default" | "playlist" | "album" | "search" | "artist";
  // albumImages?: ImageSource[]
  inclHeader?: boolean;
  adjustOrder?: number;
}
