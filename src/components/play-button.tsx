'use client'

import { memo } from 'react'
import { twMerge } from 'tailwind-merge'

import { PauseIcon, PlayIcon } from '@/public/icons'

type PlayButtonProps = {
  onClick?: (value?: any) => void
  className?: string
  isPlaying?: boolean
  iconSize?: number
}

// eslint-disable-next-line react/display-name
export const PlayButton = memo(
  ({
    className,
    isPlaying = false,
    iconSize = 20,
    onClick,
  }: PlayButtonProps) => {
    const Icon = isPlaying ? PauseIcon : PlayIcon

    return (
      <div
        onClick={onClick}
        className={twMerge(
          `
        opacity-${isPlaying ? '1' : '0'}
        translate
        flex
        items-center
        justify-center
        rounded-full
        bg-green-500
        p-4
        drop-shadow-md
        ${isPlaying ? 'translate-y-0' : 'translate-y-1/4'}
        cursor-pointer
        shadow-[0_8px_8px_rgba(0,0,0,.3)]
        transition
        hover:scale-110
        hover:brightness-110
        active:scale-100
        group-hover:translate-y-0
        group-hover:opacity-100
    `,
          className
        )}
      >
        <Icon size={iconSize} />
      </div>
    )
  }
)
