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
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useUploadModal } from '@/hooks/modals/use-upload-modal'
import { usePlayer } from '@/store/use-player'
import { useUser } from '@/hooks/use-user'
import { useUserStore } from '@/store/use-user-store'
import { useTheme } from 'next-themes'
import { MdDarkMode } from 'react-icons/md'
import { MdLightMode } from 'react-icons/md'
import { Tooltip } from './ui/tooltip'
interface UserDropdownProps {
  url: string
}

const themeIconMap = {
  LIGHT: {
    label: 'Light',
    icon: <MdLightMode size={20} className="size-4 ml-1 text-yellow-500" />,
  },
  DARK: {
    label: 'Dark',
    icon: <MdDarkMode size={20} className="size-4 ml-1 text-indigo-500" />,
  },
}

export const UserDropdown: React.FC<UserDropdownProps> = ({ url }) => {
  const { user, subscription, userDetails } = useUser()
  const { setTheme, theme } = useTheme()

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

  const icon =
    theme === 'light' ? themeIconMap.LIGHT.icon : themeIconMap.DARK.icon

  const label =
    theme === 'light' ? themeIconMap.LIGHT.label : themeIconMap.DARK.label

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

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <span className="flex items-center gap-x-2 ">
                {icon} {label}
              </span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem onSelect={() => setTheme('light')}>
                  <span className="flex items-center  gap-x-2 ">
                    {themeIconMap.LIGHT.icon} Light
                  </span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => setTheme('dark')}>
                  <span className="flex items-center gap-x-2 ">
                    {themeIconMap.DARK.icon} Dark
                  </span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
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
