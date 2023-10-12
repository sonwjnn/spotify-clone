'use client'

import { memo } from 'react'
import { FaUserAlt } from 'react-icons/fa'
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx'
import { twMerge } from 'tailwind-merge'

import { useUser } from '@/hooks/useUser'
import { HomeActiveIcon, SearchIcon } from '@/public/icons'

import Button from '../ui/Button'

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
      <div className="mb-4 flex w-full items-center justify-between">
        <div className="hidden items-center gap-x-2 md:flex">
          <button className="items-center justify-center rounded-full bg-neutral-800 transition hover:opacity-75">
            <RxCaretLeft className="text-white" size={35} />
          </button>
          <button className="items-center justify-center rounded-full bg-neutral-800 transition hover:opacity-75">
            <RxCaretRight className="text-white" size={35} />
          </button>
        </div>
        <div className="flex items-center gap-x-2 md:hidden">
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white p-2 transition hover:opacity-75">
            <HomeActiveIcon size={20} color="#000000" />
          </button>
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white p-2 transition hover:opacity-75">
            <SearchIcon size={20} color="#000000" />
          </button>
        </div>
        <div className="flex items-center justify-between gap-x-4">
          {user ? (
            <div className="flex items-center gap-x-4">
              <Button className="bg-white px-6 py-2">Logout</Button>
              <Button className="bg-white">
                <FaUserAlt />
              </Button>
            </div>
          ) : (
            <>
              <div>
                <Button className="bg-transparent font-medium text-neutral-300">
                  Sign up
                </Button>
              </div>
              <div>
                <Button className="bg-transparent font-medium text-neutral-300">
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
