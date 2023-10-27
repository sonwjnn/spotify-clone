'use client'

import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { BsThreeDots } from 'react-icons/bs'
import { twMerge } from 'tailwind-merge'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuthModal } from '@/hooks/modals/use-auth-modal'
import { useSubscribeModal } from '@/hooks/modals/use-subcribe-modal'
import { useUploadModal } from '@/hooks/modals/use-upload-modal'
import { usePlaylist } from '@/hooks/use-playlist'
import { useUser } from '@/hooks/use-user'
import { DeleteIcon } from '@/public/icons'
import type { Playlist, Song } from '@/types/types'

interface MediaDropdownProps {
  song: Song
  playlist: Playlist
  className?: string
}

export const MediaDropdown: React.FC<MediaDropdownProps> = ({
  song,
  playlist,
  className,
}) => {
  const { user, subscription } = useUser()
  const { removePlaylistSong, setDuration } = usePlaylist()
  const authModal = useAuthModal()
  const uploadModal = useUploadModal()
  const [isDropdown, setDropdown] = useState(false)
  const [isRequired, setRequired] = useState(false)

  const subcribeModal = useSubscribeModal()

  const supabaseClient = useSupabaseClient()

  const onRemove: () => Promise<void> = async () => {
    if (isRequired) return

    if (!user) {
      authModal.onOpen()
      return
    }

    if (!subscription) {
      subcribeModal.onOpen()
      return
    }

    setRequired(true)

    const { error } = await supabaseClient
      .from('playlist_songs')
      .delete()
      .eq('playlist_id', playlist.id)
      .eq('song_id', song.id)

    if (error) {
      toast.error(error.message)
      return
    }

    const updatedDuration = (playlist?.duration_ms || 0) - song.duration_ms

    const { error: playlistError } = await supabaseClient
      .from('playlists')
      .update({ duration_ms: updatedDuration })
      .eq('id', playlist.id)

    if (playlistError) {
      toast.error(playlistError.message)
      return
    }

    setDuration(updatedDuration >= 0 ? updatedDuration : 0)

    removePlaylistSong(song.id)
    toast.success('Removed!')
  }

  const onChange = (open: boolean): void => {
    if (!open) {
      setDropdown(false)
    }
  }
  return (
    <DropdownMenu
      open={isDropdown}
      defaultOpen={isDropdown}
      onOpenChange={onChange}
    >
      <DropdownMenuTrigger asChild>
        <div
          className={twMerge(
            `w-8 h-8 rounded-full transition relative hover:bg-neutral-800`,
            className
          )}
        >
          <button
            className="absolute right-[1px] flex h-full  w-full cursor-pointer items-center justify-center border-none bg-transparent text-neutral-400 outline-none transition hover:text-white focus:outline-none"
            aria-label="Customise options"
            onClick={() => setDropdown(!isDropdown)}
          >
            <BsThreeDots size={20} />
          </button>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuPortal>
        <DropdownMenuContent
          className=" mr-12 min-w-[220px] rounded-md bg-neutral-800 py-1 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform]"
          sideOffset={5}
          hidden={uploadModal.isOpen}
          side="top"
        >
          {user?.id === playlist.user_id ? (
            <DropdownMenuItem
              onSelect={onRemove}
              className="dropdown-menu-item text-white"
            >
              <DeleteIcon color="#991b1b" />
              Remove from this playlist
            </DropdownMenuItem>
          ) : null}
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  )
}
