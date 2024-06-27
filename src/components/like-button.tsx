'use client'

import { useSessionContext } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { twMerge } from 'tailwind-merge'

import { useAuthModal } from '@/hooks/modals/use-auth-modal'
import { useUser } from '@/hooks/use-user'
import { useUserStore } from '@/store/use-user-store'
import type { Song } from '@/types/types'

import { Tooltip } from './ui/tooltip'

interface LikeButtonProps {
  song: Song
  size?: number
  className?: string
  isSelected?: boolean
}

export const LikeButton: React.FC<LikeButtonProps> = ({
  song,
  size = 25,
  className,
  isSelected,
}) => {
  const { likedSongs, addLikedSong, removeLikedSong } = useUserStore()

  const { supabaseClient } = useSessionContext()

  const { user } = useUser()

  const authModal = useAuthModal()

  const [isLiked, setIsLiked] = useState<boolean>(false)

  const [isRequired, setRequired] = useState<boolean>(false)

  useEffect(() => {
    const isSongLiked = likedSongs.some(item => item.id === song.id)
    setIsLiked(isSongLiked)
  }, [likedSongs])

  const handleLike: () => Promise<void> = async () => {
    if (!user) {
      authModal.onOpen()
      return
    }
    if (isRequired) return

    setRequired(true)

    if (isLiked) {
      const { error } = await supabaseClient
        .from('liked_songs')
        .delete()
        .eq('user_id', user.id)
        .eq('song_id', song.id)

      if (error) {
        toast.error(error.message)
        return
      }
      setIsLiked(false)
      removeLikedSong(song.id)
    } else {
      const { error } = await supabaseClient.from('liked_songs').insert({
        song_id: song.id,
        user_id: user.id,
      })

      if (error) {
        toast.error(error.message)
        return
      }

      setIsLiked(true)
      addLikedSong(song)

      toast.success('Song liked!')
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
          `items-center justify-center ${
            isLiked || isSelected ? 'flex' : 'hidden'
          }  transition active:scale-110 group-hover/:flex`,
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
