'use client'

// import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { FaUserAlt } from 'react-icons/fa'
import { MdWorkspacePremium } from 'react-icons/md'
import { RiLogoutCircleLine } from 'react-icons/ri'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useUploadModal } from '@/hooks/use-upload-modal'
import { useUser } from '@/hooks/use-user'
import { usePlayer } from '@/stores/use-player'

interface UserDropdownProps {
  children: React.ReactNode
}

export const UserDropdown: React.FC<UserDropdownProps> = ({ children }) => {
  const { user } = useUser()
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
    router.refresh()

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
          className="mr-7 min-w-[220px]  rounded-md border-none  p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform]"
          sideOffset={5}
          hidden={uploadModal.isOpen}
        >
          <DropdownMenuItem
            onSelect={() => router.push('/account')}
            className="dropdown-menu-item text-white"
          >
            <MdWorkspacePremium size={20} color="#f59e0b" />
            Account
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => router.push(`/user/${user?.id}`)}
            className={`dropdown-menu-item  text-white`}
          >
            <div className="  px-1 ">
              <FaUserAlt color="#0284c7" />
            </div>
            Profile
          </DropdownMenuItem>

          <DropdownMenuSeparator className="mx-1 bg-neutral-600" />

          <DropdownMenuItem
            onSelect={handleLogout}
            className={`dropdown-menu-item  text-white`}
          >
            <div className="  px-1 text-red-500">
              <RiLogoutCircleLine />
            </div>
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  )
}
