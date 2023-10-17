'use client'

import { useSessionContext } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { ClipLoader } from 'react-spinners'

import { useAuthModal } from '@/hooks/use-auth-modal'
import { useUser } from '@/hooks/use-user'

interface PlaylistButtonProps {
  type: 'add' | 'remove'
  songId: string
  playlistId: string
}

export const PlaylistButton: React.FC<PlaylistButtonProps> = ({
  type,
  songId,
  playlistId,
}) => {
  const router = useRouter()

  const { supabaseClient } = useSessionContext()

  const { user } = useUser()

  const authModal = useAuthModal()

  const [isRequired, setRequired] = useState<boolean>(false)

  const handleLike = async (): Promise<string | void> => {
    if (!user) {
      authModal.onOpen()
      return
    }

    if (isRequired) return

    setRequired(true)

    if (type === 'add') {
      const { data, error: playlistError } = await supabaseClient
        .from('playlists')
        .select('*')
        .eq('id', playlistId)
        .single()
      if (playlistError) {
        toast.error(playlistError.message)
        return
      }

      const songIds = data.song_ids || []

      const { error } = await supabaseClient.from('playlists').upsert({
        id: playlistId,
        songIds: [...songIds, songId],
        user_id: user.id,
      })

      if (error) {
        toast.error(error.message)
        return
      }

      toast.success('Added!')
    } else {
      const { data, error: playlistError } = await supabaseClient
        .from('playlists')
        .select('*')
        .eq('id', playlistId)
        .single()
      if (playlistError) {
        toast.error(playlistError.message)
        return
      }

      let songIds = data.song_ids || []

      if (songIds.length) {
        songIds = [...songIds].filter(id => id !== songId)
      }

      const { error } = await supabaseClient.from('playlists').upsert({
        id: playlistId,
        songIds,
        user_id: user.id,
      })

      if (error) {
        toast.error(error.message)
        return
      }

      toast.success('Removed!')
    }

    setRequired(false)

    router.refresh()
  }

  return (
    <button
      onClick={handleLike}
      className={`flex h-8 min-w-[50px] items-center justify-center rounded-full border border-white bg-transparent p-2 font-semibold text-white  transition hover:scale-105 active:scale-100 disabled:cursor-not-allowed disabled:opacity-50`}
    >
      {/* eslint-disable-next-line no-nested-ternary */}
      {isRequired ? (
        <ClipLoader color="white" size={18} />
      ) : type === 'add' ? (
        'Add'
      ) : (
        'Remove'
      )}
    </button>
  )
}
