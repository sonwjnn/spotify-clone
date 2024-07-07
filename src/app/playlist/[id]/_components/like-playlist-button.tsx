'use client'

import { useSessionContext } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { twMerge } from 'tailwind-merge'

import { useAuthModal } from '@/store/modals/use-auth-modal'
import { usePlaylist } from '@/store/use-playlist'
import { useUser } from '@/hooks/use-user'
import { useUserStore } from '@/store/use-user-store'

import { Tooltip } from '@/components/ui/tooltip'

type LikePlaylistButtonProps = {
  size?: number
  className?: string
}

export const LikePlaylistButton = ({
  size = 25,
  className,
}: LikePlaylistButtonProps) => {
  const { supabaseClient } = useSessionContext()

  const { likedPlaylists, removeLikedPlaylist, addLikedPlaylist } =
    useUserStore()

  const { playlist, setLikes } = usePlaylist()

  const { user } = useUser()

  const authModal = useAuthModal()

  const [isLiked, setIsLiked] = useState<boolean>(false)

  const [isRequired, setRequired] = useState<boolean>(false)

  useEffect(() => {
    const isPlaylistLiked = likedPlaylists.some(
      item => item.id === playlist?.id
    )
    setIsLiked(isPlaylistLiked)
  }, [likedPlaylists])

  const handleLike = async (): Promise<void> => {
    if (!user) {
      authModal.onOpen()
      return
    }
    if (isRequired) return

    setRequired(true)

    if (isLiked) {
      const { error } = await supabaseClient
        .from('liked_playlists')
        .delete()
        .eq('user_id', user.id)
        .eq('playlist_id', playlist?.id)

      if (error) {
        toast.error(error.message)
        return
      }
      const updatedLikes = (playlist?.likes || 0) - 1
      const { error: updateError } = await supabaseClient
        .from('playlists')
        .update({
          likes: updatedLikes >= 0 ? updatedLikes : 0,
        })
        .eq('id', playlist?.id)

      if (updateError) {
        toast.error(updateError.message)
        return
      }

      setLikes(updatedLikes >= 0 ? updatedLikes : 0)
      setIsLiked(false)
      if (playlist?.id) removeLikedPlaylist(playlist?.id)
    } else {
      const { error } = await supabaseClient.from('liked_playlists').insert({
        playlist_id: playlist?.id,
        user_id: user.id,
      })

      if (error) {
        toast.error(error.message)
        return
      }

      const updatedLikes = (playlist?.likes || 0) + 1
      const { error: updateError } = await supabaseClient
        .from('playlists')
        .update({
          likes: updatedLikes >= 0 ? updatedLikes : 1,
        })
        .eq('id', playlist?.id)

      if (updateError) {
        toast.error(updateError.message)
        return
      }

      setLikes(updatedLikes >= 0 ? updatedLikes : 1)
      setIsLiked(true)
      if (playlist) addLikedPlaylist(playlist)
      toast.success('Playlist liked!')
    }
    setRequired(false)
  }
  const Icon = isLiked ? AiFillHeart : AiOutlineHeart

  return (
    <Tooltip
      text={`${isLiked ? 'Remove from Your Library' : 'Save to Your Library'}`}
    >
      <div
        onClick={handleLike}
        className={twMerge(
          `items-center justify-center transition active:scale-110`,
          className
        )}
      >
        <Icon
          className={` transition ${
            isLiked
              ? 'text-[#22c55e] hover:brightness-125'
              : ' text-neutral-400 hover:text-white'
          }`}
          size={size}
        />
      </div>
    </Tooltip>
  )
}
