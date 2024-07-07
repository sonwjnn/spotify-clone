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
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Tooltip } from '@/components/ui/tooltip'
import { useAuthModal } from '@/hooks/modals/use-auth-modal'
import { usePlaylistModal } from '@/hooks/modals/use-playlist-modal'
import { useSubscribeModal } from '@/hooks/modals/use-subcribe-modal'
import { useUser } from '@/hooks/use-user'
import { useUserStore } from '@/store/use-user-store'
import { DeleteIcon } from '@/public/icons'
import type { Playlist } from '@/types/types'
import { buckets } from '@/utils/constants'
import { useConfirm } from '@/hooks/use-confirm'

type PlaylistDropdownProps = {
  data: Playlist
  className?: string
}

export const PlaylistDropdown = ({
  data,
  className,
}: PlaylistDropdownProps) => {
  const [ConfirmDialog, confirm] = useConfirm(
    'Are you sure?',
    'You are about to delete this playlist'
  )
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

  const handleDeletePlaylist = async () => {
    const ok = await confirm()

    if (ok) {
      onDeletePlaylist()
    }
  }

  const handleDeleteFromLibrary = async () => {
    const ok = await confirm()

    if (ok) {
      onRemoveFromLibrary()
    }
  }

  return (
    <>
      <ConfirmDialog />
      <DropdownMenu modal={isDropdown} onOpenChange={onChange}>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center justify-center">
            <Tooltip text={`More options for this playlist`}>
              <div
                className={twMerge(
                  `relative h-8 w-8 rounded-full transition hover:text-white`,
                  className
                )}
              >
                <div
                  className="absolute right-[1px] flex h-full  w-full cursor-pointer items-center justify-center border-none bg-transparent text-neutral-400 outline-none transition hover:text-white focus:outline-none"
                  aria-label="Customise options"
                >
                  <BsThreeDots size={32} />
                </div>
              </div>
            </Tooltip>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuPortal>
          <DropdownMenuContent className="min-w-[220px] overflow-hidden rounded-md border-none py-[5px] ">
            <DropdownMenuItem onSelect={onEditPlaylist}>
              <FiEdit className="mr-2 text-neutral-400" size={16} />
              Edit details
            </DropdownMenuItem>

            {user?.id === data?.user_id ? (
              <DropdownMenuItem onSelect={handleDeletePlaylist}>
                <div className="mr-2">
                  <DeleteIcon color="#991b1b" />
                </div>
                Remove from your profile
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem onSelect={handleDeleteFromLibrary}>
                <div className="mr-2">
                  <DeleteIcon color="#991b1b" />
                </div>
                Remove from your library
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>
    </>
  )
}
