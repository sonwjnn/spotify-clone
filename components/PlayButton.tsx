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
       hover:brightness-110
       hover:scale-110
       transition
       active:scale-100
       shadow-[0_8px_8px_rgba(0,0,0,.3)]
     `}
		>
			<Icon size={20} />
		</button>
	)
}

export default PlayButton
