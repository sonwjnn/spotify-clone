import { Song } from '@/types'
import useAuthModal from './useAuthModal'
import { useUser } from './useUser'
import useSubscribeModal from './useSubscribeModal'
import usePlayer from '@/stores/usePlayer'
import useSelectedPlayer from '@/stores/useSelectedPlayer'

const useOnPlay = (songs: Song[]) => {
	const player = usePlayer()

	const { setSelected } = useSelectedPlayer()

	const authModal = useAuthModal()

	const subcribeModal = useSubscribeModal()

	const { user, subscription } = useUser()

	const onPlay = (id: string) => {
		if (!user) return authModal.onOpen()

		if (!subscription) return subcribeModal.onOpen()

		player.setId(id)

		setSelected(true)

		player.setIds(songs.map((item) => item.id))
	}

	return onPlay
}

export default useOnPlay
