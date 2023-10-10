'use client'

import { twMerge } from 'tailwind-merge'
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx'
import { HomeActiveIcon, SearchIcon } from '@/public/icons'
import Button from '../Button'
import { FaUserAlt } from 'react-icons/fa'
import { useUser } from '@/hooks/useUser'
import { memo } from 'react'

interface HeaderProps {
  children: React.ReactNode
  className?: string
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const { user } = useUser()

  return (
    <div
      className={twMerge(
        `h-fit bg-gradient-to-b from-neutral-700 px-6 py-4`,
        className
      )}
    >
      <div className="w-full mb-4 flex items-center justify-between">
        <div className="hidden md:flex gap-x-2 items-center">
          <button className="rounded-full bg-neutral-800 items-center justify-center hover:opacity-75 transition">
            <RxCaretLeft className="text-white" size={35} />
          </button>
          <button className="rounded-full bg-neutral-800 items-center justify-center hover:opacity-75 transition">
            <RxCaretRight className="text-white" size={35} />
          </button>
        </div>
        <div className="flex md:hidden gap-x-2 items-center">
          <button className="flex rounded-full w-10 h-10 bg-white p-2 items-center justify-center hover:opacity-75 transition">
            <HomeActiveIcon size={20} color="#000000" />
          </button>
          <button className="flex rounded-full w-10 h-10 bg-white p-2 items-center justify-center hover:opacity-75 transition">
            <SearchIcon size={20} color="#000000" />
          </button>
        </div>
        <div className="flex justify-between items-center gap-x-4">
          {user ? (
            <div className="flex gap-x-4 items-center">
              <Button className="bg-white px-6 py-2">Logout</Button>
              <Button className="bg-white">
                <FaUserAlt />
              </Button>
            </div>
          ) : (
            <>
              <div>
                <Button className="bg-transparent text-neutral-300 font-medium">
                  Sign up
                </Button>
              </div>
              <div>
                <Button className="bg-transparent text-neutral-300 font-medium">
                  Log in
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  )
}

export default memo(Header)
