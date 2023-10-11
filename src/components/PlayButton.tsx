import { PlayIcon, PauseIcon } from '../../public/icons'
import { twMerge } from 'tailwind-merge'

interface PlayButtonProps {
  onClick?: (value?: any) => void
  className?: string
  isPlaying?: boolean
  iconSize?: number
}

const PlayButton: React.FC<PlayButtonProps> = ({
  className,
  isPlaying = false,
  iconSize = 20,
  onClick,
}) => {
  const Icon = isPlaying ? PauseIcon : PlayIcon

  return (
    <button
      onClick={onClick}
      className={twMerge(
        `
        opacity-${isPlaying ? '1' : '0'}
        rounded-full
        flex
        items-center
        justify-center
      bg-green-500
        p-4
        drop-shadow-md
        translate
        ${isPlaying ? 'translate-y-0' : 'translate-y-1/4'}
        group-hover:opacity-100
        group-hover:translate-y-0
        hover:brightness-110
        hover:scale-110
        transition
        active:scale-100
        shadow-[0_8px_8px_rgba(0,0,0,.3)]
    `,
        className
      )}
    >
      <Icon size={iconSize} />
    </button>
  )
}

export default PlayButton
