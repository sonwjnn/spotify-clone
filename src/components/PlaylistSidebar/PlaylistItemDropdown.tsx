'use client'

import { useState } from 'react'
import * as ContextMenu from '@radix-ui/react-context-menu'
import { Playlist } from '@/types/types'
import useAuthModal from '@/hooks/useAuthModal'
import { useUser } from '@/hooks/useUser'
import useSubscribeModal from '@/hooks/useSubscribeModal'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { buckets } from '@/utils/constants'
import usePlaylistModal from '@/hooks/usePlaylistModal'
import { FiEdit } from 'react-icons/fi'
import { AddPlaylistIcon, DeleteIcon } from '/public/icons'
import { TbPin } from 'react-icons/tb'

interface PlaylistItemDropdownProps {
  children: React.ReactNode
  data: Playlist
}

const PlaylistItemDropdown: React.FC<PlaylistItemDropdownProps> = ({
  children,
  data,
}) => {
  const { user, subscription } = useUser()
  const authModal = useAuthModal()
  const uploadModal = usePlaylistModal()

  const subcribeModal = useSubscribeModal()

  const supabaseClient = useSupabaseClient()

  const [isDropdown, setDropdown] = useState(false)
  const [isRequired, setRequired] = useState(false)
  const router = useRouter()
  const currentPath = usePathname()

  const onDeletePlaylist = async () => {
    if (isRequired) return

    if (!user) {
      return authModal.onOpen()
    }
    if (!subscription) {
      return subcribeModal.onOpen()
    }

    setDropdown(false)

    setRequired(true)

    if (data.image_path) {
      const { error: oldImageError } = await supabaseClient.storage
        .from(buckets.playlist_images)
        .remove([data.image_path])

      if (oldImageError) {
        setRequired(false)
        return toast.error(oldImageError.message)
      }
    }

    const { error: supabaseError } = await supabaseClient
      .from('playlists')
      .delete()
      .eq('id', data.id)

    if (supabaseError) {
      setRequired(false)
      return toast.error(supabaseError.message)
    }

    setRequired(false)
    if (currentPath.includes(`playlist/${data.id}`)) {
      router.replace('/')
      return router.refresh()
    }

    return router.refresh()
  }

  const onCreatePlaylist = async () => {
    if (!user) {
      return authModal.onOpen()
    }
    if (!subscription) {
      return subcribeModal.onOpen()
    }
    setDropdown(false)

    setRequired(true)

    const { data, error: supabaseError } = await supabaseClient
      .from('playlists')
      .insert({
        user_id: user.id,
        title: `My new playlist`,
        description: '',
        song_ids: [],
        bg_color: '#525252',
      })
      .select()
      .single()
    if (supabaseError) {
      return toast.error(supabaseError.message)
    }
    if (data) {
      setRequired(false)
      router.refresh()
      router.push(`/playlist/${data.id}`)
    }

    return
  }

  const onEditPlaylist = async () => {
    if (!user) {
      return authModal.onOpen()
    }
    if (!subscription) {
      return subcribeModal.onOpen()
    }

    setDropdown(false)
    uploadModal.setPlaylist(data)
    return uploadModal.onOpen()
  }

  const onChange = (open: boolean) => {
    if (!open) {
      setDropdown(false)
    }
  }

  return (
    <ContextMenu.Root modal={isDropdown} onOpenChange={onChange}>
      <ContextMenu.Trigger>{children}</ContextMenu.Trigger>
      <ContextMenu.Portal>
        <ContextMenu.Content className="min-w-[220px] bg-neutral-800 rounded-md overflow-hidden py-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
          <ContextMenu.Item
            className="context-menu-item text-white"
            onSelect={onEditPlaylist}
          >
            <FiEdit className="mr-1" size={16} />
            Edit details
          </ContextMenu.Item>

          <ContextMenu.Separator className="h-[1px] bg-neutral-700 my-1" />

          <ContextMenu.Item
            className="context-menu-item text-white"
            onSelect={onCreatePlaylist}
          >
            <div className="mr-1">
              <AddPlaylistIcon size={14} />
            </div>
            Create playlist
          </ContextMenu.Item>
          <ContextMenu.Item className="context-menu-item text-white">
            <TbPin className="mr-1" size={16} />
            Pin playlist
          </ContextMenu.Item>

          <ContextMenu.Separator className="h-[1px] bg-neutral-700 my-1" />
          <ContextMenu.Item
            className="context-menu-item text-white"
            onSelect={onDeletePlaylist}
          >
            <div className="mr-1">
              <DeleteIcon color="#991b1b" />
            </div>
            Delete
          </ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  )
}

export default PlaylistItemDropdown
