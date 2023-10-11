'use client'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import { AddPlaylistIcon } from '@/public/icons'
import { AiOutlinePlus } from 'react-icons/ai'
import { LuListMusic } from 'react-icons/lu'

import { useUser } from '@/hooks/useUser'
import useAuthModal from '@/hooks/useAuthModal'
import useUploadModal from '@/hooks/useUploadModal'
import useSubscribeModal from '@/hooks/useSubscribeModal'
import { useState } from 'react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const UploadDropdown = () => {
  const { user, subscription } = useUser()
  const authModal = useAuthModal()
  const uploadModal = useUploadModal()
  const [isDropdown, setDropdown] = useState(false)
  const [isRequired, setRequired] = useState(false)

  const subcribeModal = useSubscribeModal()

  const supabaseClient = useSupabaseClient()

  const router = useRouter()

  const onUploadSong = () => {
    setDropdown(false)

    if (!user) {
      return authModal.onOpen()
    }
    if (!subscription) {
      return subcribeModal.onOpen()
    }

    return uploadModal.onOpen()
  }

  const onUploadPlaylist = async () => {
    setDropdown(false)

    if (!user) {
      return authModal.onOpen()
    }
    if (!subscription) {
      return subcribeModal.onOpen()
    }

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
          className={
            'w-8 h-8 rounded-full transition relative hover:bg-neutral-800'
          }
        >
          <button
            className="absolute flex items-center justify-center  right-[1px] border-none outline-none focus:outline-none cursor-pointer w-full h-full bg-transparent text-neutral-400 hover:text-white transition"
            aria-label="Customise options"
            onClick={() => setDropdown(!isDropdown)}
          >
            <AiOutlinePlus size={20} />
          </button>
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[220px] bg-neutral-800 rounded-md p-[5px] ml-[45%]  shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
          sideOffset={5}
          hidden={uploadModal.isOpen}
        >
          <DropdownMenu.Item
            onSelect={onUploadSong}
            className="dropdown-menu-item text-white"
          >
            <div className="pl-1  group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">
              <LuListMusic size={20} />
            </div>
            Create a new song
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onSelect={onUploadPlaylist}
            className={`dropdown-menu-item ${
              isRequired && 'select-none'
            } text-white`}
          >
            <div className="px-1  group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8">
              <AddPlaylistIcon />
            </div>
            Create a new playlist
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

export default UploadDropdown
