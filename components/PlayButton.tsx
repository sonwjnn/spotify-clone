import { PauseIcon, PlayIcon } from '@/assets/icons'
import usePlayer from '@/stores/usePlayer'

interface PlayButtonProps {
	id?: string
}

const PlayButton: React.FC<PlayButtonProps> = ({ id }) => {
	const { currentSong, isPlaying } = usePlayer()

	const isPlayingCurrentSong = currentSong?.id === id && isPlaying

	const Icon = isPlayingCurrentSong ? PauseIcon : PlayIcon
	return (
		<button
			className={`
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
        transition
        active:scale-100
      `}
		>
			<Icon />
		</button>
	)
}

export default PlayButton
