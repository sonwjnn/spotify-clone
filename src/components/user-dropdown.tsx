'use client'

import { useSupabaseClient } from '@supabase/auth-helpers-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { CgProfile } from 'react-icons/cg'
import { FaUserAlt } from 'react-icons/fa'
import { IoMdArrowDropdown } from 'react-icons/io'
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
import { usePlayer } from '@/hooks/use-player'
import { useUser } from '@/hooks/use-user'
import { useUserStore } from '@/hooks/use-user-store'

interface UserDropdownProps {
  url: string
}

export const UserDropdown: React.FC<UserDropdownProps> = ({ url }) => {
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
      <DropdownMenuTrigger asChild>
        <div
          className="flex items-center justify-center"
          onClick={() => setDropdown(!isDropdown)}
        >
          {/* eslint-disable-next-line tailwindcss/migration-from-tailwind-2 */}
          <div className="flex cursor-pointer items-center justify-center gap-x-2 rounded-full bg-black bg-opacity-30 p-1 transition hover:bg-opacity-20 hover:brightness-110">
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

            {userDetails?.full_name && (
              <p className="truncate text-sm font-bold text-white">
                {userDetails?.full_name}
              </p>
            )}

            <div className="pr-1 text-white">
              <IoMdArrowDropdown size={20} />
            </div>
          </div>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuPortal>
        <DropdownMenuContent
          className="mr-7 min-w-[220px]  rounded-md border-none  p-[5px] "
          sideOffset={5}
          hidden={uploadModal.isOpen}
        >
          <DropdownMenuItem
            onSelect={() => router.push('/account')}
            className=" text-white"
          >
            <RiVipCrownLine
              size={18}
              className={`mr-2 ${
                subscription ? 'text-yellow-500' : 'text-neutral-400'
              }`}
            />
            Account
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => router.push(`/user/${user?.id}`)}
            className={`  text-white`}
          >
            <CgProfile size={18} className="mr-2 text-neutral-400" />
            Profile
          </DropdownMenuItem>

          <DropdownMenuSeparator className="mx-1 bg-neutral-800" />

          <DropdownMenuItem onSelect={handleLogout} className={`  text-white`}>
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
