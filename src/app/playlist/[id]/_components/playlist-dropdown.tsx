'use client'

import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { BsThreeDots } from 'react-icons/bs'
import { FiEdit } from 'react-icons/fi'
import { twMerge } from 'tailwind-merge'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuthModal } from '@/hooks/modals/use-auth-modal'
import { usePlaylistModal } from '@/hooks/modals/use-playlist-modal'
import { useSubscribeModal } from '@/hooks/modals/use-subcribe-modal'
import { useUser } from '@/hooks/use-user'
import { useUserStore } from '@/hooks/use-user-store'
import { DeleteIcon } from '@/public/icons'
import type { Playlist } from '@/types/types'
import { buckets } from '@/utils/constants'

interface PlaylistDropdownProps {
  data: Playlist
  className?: string
}

export const PlaylistDropdown: React.FC<PlaylistDropdownProps> = ({
  data,
  className,
}) => {
  const { user, subscription } = useUser()
  const authModal = useAuthModal()
  const uploadModal = usePlaylistModal()

  const subcribeModal = useSubscribeModal()

  const supabaseClient = useSupabaseClient()
  const { removeLikedPlaylist, removePlaylist } = useUserStore()

  const [isDropdown, setDropdown] = useState(false)
  const [isRequired, setRequired] = useState(false)
  const router = useRouter()
  const currentPath = usePathname()

  const onDeletePlaylist = async (): Promise<void> => {
    if (isRequired) return

    if (!user) {
      authModal.onOpen()
      return
    }
    if (!subscription) {
      subcribeModal.onOpen()
      return
    }

    setDropdown(false)

    setRequired(true)

    if (data.image_path) {
      const { error: oldImageError } = await supabaseClient.storage
        .from(buckets.playlist_images)
        .remove([data.image_path])

      if (oldImageError) {
        setRequired(false)
        toast.error(oldImageError.message)
        return
      }
    }

    const { error: supabaseError } = await supabaseClient
      .from('playlists')
      .delete()
      .eq('id', data.id)

    if (supabaseError) {
      setRequired(false)
      toast.error(supabaseError.message)
      return
    }
    removePlaylist(data.id)

    setRequired(false)
    if (currentPath.includes(`playlist/${data.id}`)) {
      router.replace('/')
    }
  }

  const onEditPlaylist = async (): Promise<void> => {
    if (!user) {
      authModal.onOpen()
      return
    }
    if (!subscription) {
      subcribeModal.onOpen()
      return
    }

    setDropdown(false)
    uploadModal.setPlaylist(data)
    uploadModal.onOpen()
  }

  const onRemoveFromLibrary = async (): Promise<void> => {
    const { error } = await supabaseClient
      .from('liked_playlists')
      .delete()
      .eq('user_id', user?.id)
      .eq('playlist_id', data.id)

    if (error) {
      toast.error(error.message)
      return
    }

    removeLikedPlaylist(data.id)
  }
  const onChange = (open: boolean): void => {
    if (!open) {
      setDropdown(false)
    }
  }

  return (
    <DropdownMenu modal={isDropdown} onOpenChange={onChange}>
      <DropdownMenuTrigger>
        <div
          className={twMerge(
            `w-8 h-8 rounded-full transition relative hover:text-white`,
            className
          )}
        >
          <button
            className="absolute right-[1px] flex h-full  w-full cursor-pointer items-center justify-center border-none bg-transparent text-neutral-400 outline-none transition hover:text-white focus:outline-none"
            aria-label="Customise options"
          >
            <BsThreeDots size={32} />
          </button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent className="min-w-[220px] overflow-hidden rounded-md border-none py-[5px] ">
          <DropdownMenuItem className=" text-white" onSelect={onEditPlaylist}>
            <FiEdit className="mr-2 text-neutral-400" size={16} />
            Edit details
          </DropdownMenuItem>

          <DropdownMenuSeparator className="mx-1 bg-neutral-800" />
          {user?.id === data?.user_id ? (
            <DropdownMenuItem
              className=" text-white"
              onSelect={onDeletePlaylist}
            >
              <div className="mr-2">
                <DeleteIcon color="#991b1b" />
              </div>
              Remove from your profile
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              className=" text-white"
              onSelect={onRemoveFromLibrary}
            >
              <div className="mr-2">
                <DeleteIcon color="#991b1b" />
              </div>
              Remove from your library
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  )
}
