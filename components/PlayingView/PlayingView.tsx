'use client'

import { CloseIcon, MusicNote } from '@/assets/icons'
import Link from 'next/link'
import NextSong from './NextSong'
import Box from '../Box'
import Image from 'next/image'
import LikeButton from '../LikeButton'

import useLoadImage from '@/hooks/useLoadImage'
import usePlayer from '@/stores/usePlayer'
import useGetSongById from '@/hooks/useGetSongById'
import usePlayingView from '@/stores/usePlayingView'
import MarqueeWrapper from '../Marquee'
import { useState } from 'react'
import ScrollbarProvider from '@/providers/ScrollbarProvider'

const PlayingView: React.FC = () => {
	const playingView = usePlayingView()
	const { currentSong, activeId, ids: playerIds } = usePlayer()
	const imagePath = useLoadImage(currentSong)

	// find next song
	const currentIndex = playerIds.findIndex((id) => id === activeId)
	const nextSongId = playerIds[currentIndex + 1] || playerIds[0]
	const { song: nextSong } = useGetSongById(nextSongId)

	const [isScroll, setScroll] = useState<boolean>(false)

	const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>): void => {
		const yAxis = e.currentTarget.scrollTop
		console.log(123)
		if (yAxis) {
			setScroll(true)
		} else setScroll(false)
	}

	return (
		<div className='hidden md:block max-w-[400px] min-w-[280px] relative   bg-black rounded-md py-2 pr-2  h-full '>
			<div className='h-full w-full bg-neutral-900 rounded-lg overflow-hidden'>
				<Box className='h-full'>
					<ScrollbarProvider onScroll={handleScroll}>
						<div
							className={`min-h-8 p-4 pb-3  flex flex-row justify-end sticky top-0 bg-neutral-900 z-10 ${
								isScroll ? 'shadow-2xl' : ''
							}`}
						>
							<div
								className={'w-8 h-8 rounded-full transition relative hover:bg-neutral-800'}
							>
								<button
									className='absolute flex items-center justify-center top-[1px] right-0 border-none outline-none focus:outline-none cursor-pointer w-full h-full bg-transparent text-neutral-400 hover:text-white transition'
									onClick={() => playingView.setShowed(false)}
								>
									<CloseIcon />
								</button>
							</div>
						</div>
						<div className='flex flex-col gap-4 p-4 pt-0'>
							{imagePath
								? (
									<div className='relative aspect-square h-full w-full rounded-lg overflow-hidden'>
										<Image
											className='
            object-cover
          '
											src={imagePath}
											fill
											alt='Img'
											sizes='100%'
										/>
									</div>
								)
								: (
									<div
										className={'h-full w-full text-white rounded-lg bg-[#282828] flex items-center justify-center'}
									>
										<MusicNote size={114} />
									</div>
								)}
							<div
								className={'flex flex-row items-center justify-between gap-6 w-full h-[64px]'}
							>
								<div
									className={'flex-1 flex flex-col overflow-hidden'}
								>
									<Link href={'/'}>
										<MarqueeWrapper
											pauseOnHover={true}
											speed={20}
										>
											<h2
												className={'text-2xl text-white m-0 pb-2 font-bold hover:underline hover:decoration-2'}
											>
												{currentSong?.title}
											</h2>
										</MarqueeWrapper>
									</Link>
									<span className={''}>
										<p className='text-neutral-400 text-base pb-4 w-full truncate'>
											{currentSong?.author}
										</p>
									</span>
								</div>
								<div
									className={'w-8 text-neutral-400 cursor-pointer hover:text-white'}
								>
									<LikeButton
										songId={currentSong?.id || ''}
										size={22}
									/>
								</div>
							</div>

							<div
								className={'flex flex-row gap-3 items-center rounded-lg overflow-hidden '}
							>
								<NextSong song={nextSong} />
							</div>
						</div>
					</ScrollbarProvider>
				</Box>
			</div>
		</div>
	)
}

export default PlayingView
