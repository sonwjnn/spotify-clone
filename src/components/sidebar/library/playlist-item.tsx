'use client'

import { useSupabaseClient } from '@supabase/auth-helpers-react'
import Image from 'next/image'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { FiEdit } from 'react-icons/fi'
import { TbPin } from 'react-icons/tb'

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuPortal,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'
import { useAuthModal } from '@/hooks/modals/use-auth-modal'
import { usePlaylistModal } from '@/hooks/modals/use-playlist-modal'
import { useSubscribeModal } from '@/hooks/modals/use-subcribe-modal'
import { useLoadImage } from '@/hooks/use-load-image'
import { usePlayer } from '@/hooks/use-player'
import { useUser } from '@/hooks/use-user'
import { useUserStore } from '@/hooks/use-user-store'
import {
  AddPlaylistIcon,
  DeleteIcon,
  MusicNote,
  SoundIconSolid,
} from '@/public/icons'
import type { Playlist } from '@/types/types'
import cn from '@/utils/cn'
import { buckets } from '@/utils/constants'

interface PlaylistItemProps {
  data: Playlist
  type?: 'myPlaylist' | 'otherPlaylist'
}

export const PlaylistItem: React.FC<PlaylistItemProps> = ({
  data,
  type = 'myPlaylist',
}) => {
  const { user, subscription } = useUser()
  const authModal = useAuthModal()
  const uploadModal = usePlaylistModal()

  const subcribeModal = useSubscribeModal()

  const supabaseClient = useSupabaseClient()
  const { removeLikedPlaylist, removePlaylist, addPlaylist } = useUserStore()

  const [is, set] = useState(false)
  const [isRequired, setRequired] = useState(false)
  const router = useRouter()
  const currentPath = usePathname()

  const { playlistPlayingId, isPlaying } = usePlayer()
  const imageUrl = useLoadImage(data.image_path, buckets.playlist_images)
  const { id } = useParams()

  const onClick = (): void => {
    uploadModal.setPlaylist(data)
    router.push(`/playlist/${data.id}`)
  }

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

    set(false)

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

  const onCreatePlaylist = async (): Promise<void> => {
    if (!user) {
      authModal.onOpen()
      return
    }
    if (!subscription) {
      subcribeModal.onOpen()
      return
    }
    set(false)

    setRequired(true)

    const { data: newPlaylist, error: supabaseError } = await supabaseClient
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
      toast.error(supabaseError.message)
      return
    }
    if (newPlaylist) {
      addPlaylist(newPlaylist as Playlist)
      setRequired(false)
      router.push(`/playlist/${data.id}`)
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

    set(false)
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
      set(false)
    }
  }

  const fullName = data.users?.full_name
  const isActived = playlistPlayingId === data.id

  return (
    <ContextMenu modal={is} onOpenChange={onChange}>
      <ContextMenuTrigger>
        <div
          className={cn(
            ` cursor-pointer rounded-md p-2 flex justify-between items-center transition w-full  `,
            id === data.id.toString() &&
              'bg-neutral-800 active:bg-neutral-800/75 hover:bg-neutral-700',
            id !== data.id.toString() &&
              'active:bg-black hover:bg-neutral-800/50'
          )}
          onClick={onClick}
        >
          <div className="flex min-w-0 items-center gap-x-3">
            <div className="relative min-h-[48px] min-w-[48px] overflow-hidden rounded-md">
              {imageUrl ? (
                <Image
                  fill
                  src={imageUrl}
                  sizes="100%"
                  alt="Media-Item"
                  className="object-cover"
                  blurDataURL={imageUrl}
                  placeholder="blur"
                />
              ) : (
                <div className="flex min-h-[48px] w-full items-center justify-center bg-neutral-800 text-white">
                  <MusicNote size={20} />
                </div>
              )}
            </div>
            <div className="flex flex-col gap-y-1 overflow-hidden ">
              <p
                className={` truncate  ${
                  isActived ? 'text-[#2ed760]' : 'text-white'
                }`}
              >
                {data.title}
              </p>
              <p className="truncate text-sm text-neutral-400">
                {`Playlist - ${fullName}`}
              </p>
            </div>
          </div>
          {isActived && isPlaying ? (
            <div className="pr-2">
              <SoundIconSolid color="#2ed760" />
            </div>
          ) : null}
        </div>
      </ContextMenuTrigger>
      <ContextMenuPortal>
        <ContextMenuContent className="min-w-[220px] overflow-hidden rounded-md border-none bg-neutral-800 py-[5px] ">
          {type === 'myPlaylist' ? (
            <>
              <ContextMenuItem
                className="context-menu-item text-white"
                onSelect={onEditPlaylist}
              >
                <FiEdit className="mr-1" size={16} />
                Edit details
              </ContextMenuItem>

              {/* <ContextMenuSeparator className="my-1 h-[1px] bg-neutral-700" /> */}

              <ContextMenuItem
                className="context-menu-item text-white"
                onSelect={onCreatePlaylist}
              >
                <div className="mr-1">
                  <AddPlaylistIcon size={14} />
                </div>
                Create playlist
              </ContextMenuItem>
              <ContextMenuItem className="context-menu-item text-white">
                <TbPin className="mr-1" size={16} />
                Pin playlist
              </ContextMenuItem>

              {/* <ContextMenuSeparator className="my-1 h-[1px] bg-neutral-700" /> */}
              <ContextMenuItem
                className="context-menu-item text-white"
                onSelect={onDeletePlaylist}
              >
                <div className="mr-1">
                  <DeleteIcon color="#991b1b" />
                </div>
                Delete
              </ContextMenuItem>
            </>
          ) : null}

          {type === 'otherPlaylist' ? (
            <ContextMenuItem
              className="context-menu-item text-white"
              onSelect={onRemoveFromLibrary}
            >
              <div className="mr-1">
                <DeleteIcon color="#991b1b" />
              </div>
              Remove from your library
            </ContextMenuItem>
          ) : null}
        </ContextMenuContent>
      </ContextMenuPortal>
    </ContextMenu>
  )
}
