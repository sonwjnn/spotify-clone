'use client'

import { useSessionContext } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { twMerge } from 'tailwind-merge'

import useAuthModal from '@/hooks/useAuthModal'
import { useUser } from '@/hooks/useUser'
import useUserStore from '@/stores/useUserStore'
import type { Song } from '@/types/types'

interface LikeButtonProps {
  song: Song
  songId: string
  size?: number
  className?: string
  playlistId?: string
  isSelected?: boolean
}

const LikeButton: React.FC<LikeButtonProps> = ({
  song,
  songId,
  size = 25,
  className,
  isSelected,
}) => {
  const { addLikedSong, removeLikedSong } = useUserStore()

  const { supabaseClient } = useSessionContext()

  const { user } = useUser()

  const authModal = useAuthModal()

  const [isLiked, setIsLiked] = useState<boolean>(false)

  const [isRequired, setRequired] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const { data, error } = await supabaseClient
        .from('liked_songs')
        .select('*')
        .eq('user_id', user?.id)
        .eq('song_id', songId)

      if (!error && data.length) {
        setIsLiked(true)
      } else {
        setIsLiked(false)
      }
    }

    fetchData()
  }, [songId, supabaseClient, user?.id])

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
        .eq('song_id', songId)

      if (error) {
        toast.error(error.message)
        return
      }
      setIsLiked(false)
      removeLikedSong(songId)
    } else {
      const { error } = await supabaseClient.from('liked_songs').insert({
        song_id: songId,
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
    <button
      onClick={handleLike}
      className={twMerge(
        `justify-center items-center ${
          isLiked || isSelected ? 'flex' : 'hidden'
        }  group-hover/:flex transition`,
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
    </button>
  )
}

export default LikeButton
