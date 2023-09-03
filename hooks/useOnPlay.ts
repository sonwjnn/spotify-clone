import { Song } from '@/types'
import usePlayer from './usePlayer'
import useAuthModal from './useAuthModal'
import { useUser } from './useUser'
import useSubscribeModal from './useSubscribeModal'

const useOnPlay = (songs: Song[]) => {
	const player = usePlayer()

	const authModal = useAuthModal()

	const subcribeModal = useSubscribeModal()

	const { user, subscription } = useUser()

	const onPlay = (id: string) => {
		if (!user) return authModal.onOpen()

		if (!subscription) return subcribeModal.onOpen()

		player.setId(id)

		player.setIds(songs.map((item) => item.id))
	}

	return onPlay
}

export default useOnPlay
