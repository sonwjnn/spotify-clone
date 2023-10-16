'use client'

import { useSessionContext } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { twMerge } from 'tailwind-merge'

import useAuthModal from '@/hooks/use-auth-modal'
import { useUser } from '@/hooks/use-user'
import useUserStore from '@/stores/use-user-store'
import type { Playlist } from '@/types/types'

import { Tooltip } from './ui/tooltip'

interface LikePlaylistButtonProps {
  playlist: Playlist
  size?: number
  className?: string
}

const LikePlaylistButton: React.FC<LikePlaylistButtonProps> = ({
  playlist,
  size = 25,
  className,
}) => {
  const { supabaseClient } = useSessionContext()

  const { likedPlaylists, removeLikedPlaylist, addLikedPlaylist } =
    useUserStore()

  const { user } = useUser()

  const authModal = useAuthModal()

  const [isLiked, setIsLiked] = useState<boolean>(false)

  const [isRequired, setRequired] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const { data, error } = await supabaseClient
        .from('liked_playlists')
        .select('*')
        .eq('user_id', user?.id)
        .eq('playlist_id', playlist.id)
        .single()

      if (!error && data) {
        setIsLiked(true)
      } else {
        setIsLiked(false)
      }
    }

    fetchData()
  }, [playlist, supabaseClient, user?.id])

  useEffect(() => {
    const isPlaylistLiked = likedPlaylists.some(item => item.id === playlist.id)
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
        .eq('playlist_id', playlist.id)

      if (error) {
        toast.error(error.message)
        return
      }
      setIsLiked(false)
      removeLikedPlaylist(playlist.id)
    } else {
      const { error } = await supabaseClient.from('liked_playlists').insert({
        playlist_id: playlist.id,
        user_id: user.id,
      })

      if (error) {
        toast.error(error.message)
        return
      }

      setIsLiked(true)
      addLikedPlaylist(playlist)
      toast.success('Playlist liked!')
    }
    setRequired(false)
  }
  const Icon = isLiked ? AiFillHeart : AiOutlineHeart

  return (
    <Tooltip
      text={`${isLiked ? 'Remove from Your Library' : 'Save to Your Library'}`}
    >
      <button
        onClick={handleLike}
        className={twMerge(`justify-center items-center transition`, className)}
      >
        <Icon
          className={` transition ${
            isLiked
              ? 'text-[#22c55e] hover:brightness-125'
              : ' text-neutral-400 hover:text-white'
          }`}
          size={size}
        />
      </button>
    </Tooltip>
  )
}

export default LikePlaylistButton
