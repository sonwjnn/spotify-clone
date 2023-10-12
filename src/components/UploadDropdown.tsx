'use client'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { AiOutlinePlus } from 'react-icons/ai'
import { LuListMusic } from 'react-icons/lu'

import useAuthModal from '@/hooks/useAuthModal'
import useSubscribeModal from '@/hooks/useSubscribeModal'
import useUploadModal from '@/hooks/useUploadModal'
import { useUser } from '@/hooks/useUser'
import { AddPlaylistIcon } from '@/public/icons'

const UploadDropdown: React.FC = () => {
  const { user, subscription } = useUser()
  const authModal = useAuthModal()
  const uploadModal = useUploadModal()
  const [isDropdown, setDropdown] = useState(false)
  const [isRequired, setRequired] = useState(false)

  const subcribeModal = useSubscribeModal()

  const supabaseClient = useSupabaseClient()

  const router = useRouter()

  const onUploadSong = (): void => {
    setDropdown(false)

    if (!user) {
      return authModal.onOpen()
    }
    if (!subscription) {
      return subcribeModal.onOpen()
    }

    return uploadModal.onOpen()
  }

  const onUploadPlaylist = async (): Promise<void> => {
    setDropdown(false)

    if (!user) {
      authModal.onOpen()
      return
    }
    if (!subscription) {
      subcribeModal.onOpen()
      return
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
      toast.error(supabaseError.message)
      return
    }
    if (data) {
      setRequired(false)
      router.refresh()
      router.push(`/playlist/${data.id}`)
    }
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
          className={
            'relative h-8 w-8 rounded-full transition hover:bg-neutral-800'
          }
        >
          <button
            className="absolute right-[1px] flex h-full  w-full cursor-pointer items-center justify-center border-none bg-transparent text-neutral-400 outline-none transition hover:text-white focus:outline-none"
            aria-label="Customise options"
            onClick={() => setDropdown(!isDropdown)}
          >
            <AiOutlinePlus size={20} />
          </button>
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[220px] rounded-md bg-neutral-800 p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform]"
          sideOffset={5}
          hidden={uploadModal.isOpen}
        >
          <DropdownMenu.Item
            onSelect={onUploadSong}
            className="dropdown-menu-item text-white"
          >
            <div className="  pl-1 ">
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
            <div className="  px-1 ">
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
