'use client'

// import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { CgProfile } from 'react-icons/cg'
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
  children: React.ReactNode
}

export const UserDropdown: React.FC<UserDropdownProps> = ({ children }) => {
  const { user, subscription } = useUser()
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
          {children}
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
