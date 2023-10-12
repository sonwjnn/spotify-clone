'use client'

import { useSessionContext } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { twMerge } from 'tailwind-merge'

import useAuthModal from '@/hooks/useAuthModal'
import { useUser } from '@/hooks/useUser'

interface PlaylistLikeButtonProps {
  size?: number
  className?: string
  playlistId?: string
}

const PlaylistLikeButton: React.FC<PlaylistLikeButtonProps> = ({
  playlistId,
  size = 25,
  className,
}) => {
  const router = useRouter()

  const { supabaseClient } = useSessionContext()

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
        .eq('playlist_id', playlistId)
        .single()

      if (!error && data) {
        setIsLiked(true)
      } else {
        setIsLiked(false)
      }
    }

    fetchData()
  }, [playlistId, supabaseClient, user?.id])

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
        .eq('playlist_id', playlistId)

      if (error) {
        toast.error(error.message)
        return
      }
      setIsLiked(false)
    } else {
      const { error } = await supabaseClient.from('liked_playlists').insert({
        playlist_id: playlistId,
        user_id: user.id,
      })

      if (error) {
        toast.error(error.message)
        return
      }

      setIsLiked(true)

      toast.success('Playlist liked!')
    }
    setRequired(false)

    router.refresh()
  }
  const Icon = isLiked ? AiFillHeart : AiOutlineHeart

  return (
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
  )
}

export default PlaylistLikeButton
