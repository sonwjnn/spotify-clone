'use client'

import { useSupabaseClient } from '@supabase/auth-helpers-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { CgProfile } from 'react-icons/cg'
import { FaUserAlt } from 'react-icons/fa'
import { LuLogOut } from 'react-icons/lu'
import { RiVipCrownLine } from 'react-icons/ri'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useUploadModal } from '@/hooks/modals/use-upload-modal'
import { usePlayer } from '@/store/use-player'
import { useUser } from '@/hooks/use-user'
import { useUserStore } from '@/store/use-user-store'
import { Tooltip } from '@/components/ui/tooltip'
import ThemeSelect from '@/components/theme-select'
type UserDropdownProps = {
  url: string
}

export const UserDropdown = ({ url }: UserDropdownProps) => {
  const { user, subscription, userDetails } = useUser()

  const userStore = useUserStore()
  const uploadModal = useUploadModal()
  const [isDropdown, setDropdown] = useState(false)
  const player = usePlayer()

  const router = useRouter()
  const supabaseClient = useSupabaseClient()

  const onChange = (open: boolean): void => {
    if (!open) {
      setDropdown(false)
    }
  }

  const handleLogout = async (): Promise<void> => {
    const { error } = await supabaseClient.auth.signOut()
    player.reset()
    userStore.reset()

    if (error) {
      toast.error(error.message)
    } else {
      toast.success('Logged out!')
    }
  }

  return (
    <DropdownMenu
      open={isDropdown}
      defaultOpen={isDropdown}
      onOpenChange={onChange}
    >
      <Tooltip text={userDetails?.full_name || 'No name'}>
        <DropdownMenuTrigger asChild>
          <div
            className="flex items-center justify-center"
            onClick={() => setDropdown(!isDropdown)}
          >
            {/* eslint-disable-next-line tailwindcss/migration-from-tailwind-2 */}
            <div className="flex cursor-pointer items-center justify-center gap-x-2 rounded-full bg-white bg-opacity-30 p-1 transition hover:bg-opacity-20 hover:brightness-110 dark:bg-black">
              <div className="relative h-9 w-9 cursor-pointer overflow-hidden rounded-full bg-white">
                {url ? (
                  <Image
                    className="object-cover"
                    fill
                    alt="avatar img"
                    sizes="100%"
                    src={url}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <FaUserAlt />
                  </div>
                )}
              </div>
            </div>
          </div>
        </DropdownMenuTrigger>
      </Tooltip>

      <DropdownMenuPortal>
        <DropdownMenuContent
          className="mr-7 min-w-[220px]  rounded-md border-none p-[5px]"
          sideOffset={5}
          hidden={uploadModal.isOpen}
        >
          <DropdownMenuItem onSelect={() => router.push('/account')}>
            <RiVipCrownLine
              size={18}
              className={`mr-2 ${
                subscription ? 'text-yellow-500' : 'text-neutral-400'
              }`}
            />
            Account
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => router.push(`/user/${user?.id}`)}>
            <CgProfile size={18} className="mr-2 text-neutral-400" />
            Profile
          </DropdownMenuItem>

          <ThemeSelect />
          <DropdownMenuSeparator className="mx-1 bg-zinc-300 dark:bg-neutral-800" />

          <DropdownMenuItem onSelect={handleLogout}>
            <div className=" text-red-500">
              <LuLogOut size={18} className="mr-2" />
            </div>
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  )
}
