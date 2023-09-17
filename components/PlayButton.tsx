import { PauseIcon, PlayIcon } from '@/assets/icons'
import { useAppSelector } from '@/redux/hooks'

interface PlayButtonProps {
	id?: string
}

const PlayButton: React.FC<PlayButtonProps> = ({ id }) => {
	const { currentSong, isPlaying } = useAppSelector((state) => state.player)

	const isPlayingCurrentSong = currentSong?.id === id && isPlaying

	const Icon = isPlayingCurrentSong ? PauseIcon : PlayIcon
	return (
		<button
			className={`
        transition
        opacity-${isPlayingCurrentSong ? '1' : '0'}
        rounded-full
        flex
        items-center
        justify-center
        bg-green-500
        p-4
        drop-shadow-md
        translate
        translate-y-${isPlayingCurrentSong ? '0' : '1/4'}
        group-hover:opacity-100
        group-hover:translate-y-0
        hover:scale-110
      `}
		>
			<Icon />
		</button>
	)
}

export default PlayButton
