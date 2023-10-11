'use client'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import { DeleteIcon } from '../../public/icons'
import { BsThreeDots } from 'react-icons/bs'

import { useUser } from '@/hooks/useUser'
import useAuthModal from '@/hooks/useAuthModal'
import useUploadModal from '@/hooks/useUploadModal'
import useSubscribeModal from '@/hooks/useSubscribeModal'
import { useState } from 'react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { twMerge } from 'tailwind-merge'

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

  const onRemove = async () => {
    if (isRequired) return

    if (!user) return authModal.onOpen()

    if (!subscription) return subcribeModal.onOpen()

    setRequired(true)

    const { data, error: playlistError } = await supabaseClient
      .from('playlists')
      .select('*')
      .eq('id', playlistId)
      .single()
    if (playlistError) return toast.error(playlistError.message)

    let song_ids = data.song_ids || []

    if (song_ids.length) {
      song_ids = [...song_ids].filter(id => id !== songId)
    }

    const { error } = await supabaseClient.from('playlists').upsert({
      id: playlistId,
      song_ids: song_ids,
      user_id: user.id,
    })

    if (error) return toast.error(error.message)

    toast.success('Removed!')

    setRequired(false)

    router.refresh()
  }

  const onChange = (open: boolean) => {
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
            className="absolute flex items-center justify-center  right-[1px] border-none outline-none focus:outline-none cursor-pointer w-full h-full bg-transparent text-neutral-400 hover:text-white transition"
            aria-label="Customise options"
            onClick={() => setDropdown(!isDropdown)}
          >
            <BsThreeDots size={20} />
          </button>
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[220px] bg-neutral-800 rounded-md py-1 mr-12 shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
          sideOffset={5}
          hidden={uploadModal.isOpen}
        >
          {/* <DropdownMenu.Item */}
          {/* 	onSelect={onUploadPlaylist} */}
          {/* 	className={`dropdown-menu-item`} */}
          {/* > */}
          {/* 	Add to playlist .. */}
          {/* </DropdownMenu.Item> */}
          {/**/}
          {/* <DropdownMenu.Separator className='h-[1px] bg-neutral-700 my-1' /> */}

          <DropdownMenu.Item
            onSelect={onRemove}
            className="text-white dropdown-menu-item mx-1"
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
