'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx'
import { HiHome } from 'react-icons/hi'
import { BiSearch } from 'react-icons/bi'
import Button from './Button'

interface HeaderProps {
  children: React.ReactNode
  classname?: string
}

const Header: React.FC<HeaderProps> = ({ children, classname }) => {
  const router = useRouter()

  const handleLogout = () => {
    // handle logout in the future
  }
  return (
    <div
      className={twMerge(
        `h-fit bg-gradient-to-b from-emerald-800 p-6`,
        classname
      )}
    >
      <div className="w-full mb-4 flex items-center justify-between">
        <div className="hidden md:flex gap-x-2 items-center">
          <button
            className="rounded-full bg-black items-center justify-center hover:opacity-75 transition"
            onClick={() => router.back()}
          >
            <RxCaretLeft className="text-white" size={35} />
          </button>
          <button
            className="rounded-full bg-black items-center justify-center hover:opacity-75 transition"
            onClick={() => router.forward()}
          >
            <RxCaretRight className="text-white" size={35} />
          </button>
        </div>
        <div className="flex md:hidden gap-x-2 items-center">
          <button className="flex rounded-full bg-white p-2 items-center justify-center hover:opacity-75 transition">
            <HiHome className="text-black " size={20} />
          </button>
          <button className="flex rounded-full bg-white p-2 items-center justify-center hover:opacity-75 transition">
            <BiSearch className="text-black " size={20} />
          </button>
        </div>
        <div className="flex justify-between items-center gap-x-4">
          <>
            <div>
              <Button
                className="bg-transparent text-neutral-300 font-medium"
                onClick={() => {}}
              >
                Sign up
              </Button>
            </div>
            <div>
              <Button
                className="bg-transparent text-neutral-300 font-medium"
                onClick={() => {}}
              >
                Log in
              </Button>
            </div>
          </>
        </div>
      </div>
      {children}
    </div>
  )
}

export default Header
