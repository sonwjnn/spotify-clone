'use client'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { BsThreeDots } from 'react-icons/bs'
import { twMerge } from 'tailwind-merge'

import useAuthModal from '@/hooks/useAuthModal'
import useSubscribeModal from '@/hooks/useSubscribeModal'
import useUploadModal from '@/hooks/useUploadModal'
import { useUser } from '@/hooks/useUser'
import { DeleteIcon } from '@/public/icons'

interface MediaDropdownProps {
  songId: string
  playlistId: string
  className?: string
}

const MediaDropdown: React.FC<MediaDropdownProps> = ({
  songId,
  playlistId,
  className,
}) => {
  const { user, subscription } = useUser()
  const authModal = useAuthModal()
  const uploadModal = useUploadModal()
  const [isDropdown, setDropdown] = useState(false)
  const [isRequired, setRequired] = useState(false)

  const subcribeModal = useSubscribeModal()

  const supabaseClient = useSupabaseClient()

  const router = useRouter()

  const onRemove: () => Promise<void> = async () => {
    if (isRequired) return

    if (!user) {
      authModal.onOpen()
      return
    }

    if (!subscription) {
      subcribeModal.onOpen()
      return
    }

    setRequired(true)

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

    setRequired(false)

    router.refresh()
  }

  const onChange = (open: boolean): void => {
    if (!open) {
      setDropdown(false)
    }
  }
  return (
    <DropdownMenu.Root
      open={isDropdown}
      defaultOpen={isDropdown}
      onOpenChange={onChange}
    >
      <DropdownMenu.Trigger asChild>
        <div
          className={twMerge(
            `w-8 h-8 rounded-full transition relative hover:bg-neutral-800`,
            className
          )}
        >
          <button
            className="absolute right-[1px] flex h-full  w-full cursor-pointer items-center justify-center border-none bg-transparent text-neutral-400 outline-none transition hover:text-white focus:outline-none"
            aria-label="Customise options"
            onClick={() => setDropdown(!isDropdown)}
          >
            <BsThreeDots size={20} />
          </button>
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className=" mr-12 min-w-[220px] rounded-md bg-neutral-800 py-1 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform]"
          sideOffset={5}
          hidden={uploadModal.isOpen}
        >
          <DropdownMenu.Item
            onSelect={onRemove}
            className="dropdown-menu-item mx-1 text-white"
          >
            <DeleteIcon color="#991b1b" />
            Remove from this playlist
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

export default MediaDropdown
