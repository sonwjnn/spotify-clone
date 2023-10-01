'use client'

import uniqid from 'uniqid'
import { useEffect, useState } from 'react'
import Modal from './Modal'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Input from './Input'
import Button from './Button'
import { toast } from 'react-hot-toast'
import { useUser } from '@/hooks/useUser'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useParams, useRouter } from 'next/navigation'
import usePlaylistModal from '@/hooks/usePlaylistModal'
import { MusicNote } from '@/assets/icons'
import Image from 'next/image'
import useLoadImage from '@/hooks/useLoadImage'
import { buckets } from '@/utils/constants'

const UploadPlaylistModal = () => {
	const [isLoading, setIsLoading] = useState(false)
	const uploadModal = usePlaylistModal()

	const playlistImgDefault = useLoadImage(
		uploadModal.playlist?.image_path!,
		buckets.playlist_images,
	)
	const [file, setFile] = useState<string>(playlistImgDefault || '')
	const { user } = useUser()
	const supabaseClient = useSupabaseClient()
	const router = useRouter()
	const params = useParams()

	const playlistId = uploadModal.playlist?.id || params.id

	const { reset, handleSubmit, register } = useForm<FieldValues>({
		defaultValues: {
			description: uploadModal.playlist?.description,
			title: uploadModal.playlist?.title,
			playlist_img: null,
		},
	})

	const onChange = (open: boolean) => {
		if (!open) {
			reset()
			uploadModal.onClose()
		}
	}

	const handleChange = (event: any) => {
		if (event.target.files[0]) {
			setFile(URL.createObjectURL(event.target.files[0]))
		}
	}

	const onSubmit: SubmitHandler<FieldValues> = async (values) => {
		try {
			setIsLoading(true)

			const imageFile = values.playlist_img?.[0]

			if (!user || !imageFile) {
				toast.error('Missing fields')
				return
			}

			const uniqID = uniqid()

			//Upload images
			const { data: imageData, error: imageError } = await supabaseClient
				.storage
				.from(buckets.playlist_images)
				.upload(
					`playlist-image-${uniqID}`,
					imageFile,
					{
						cacheControl: '3600',
						upsert: false,
					},
				)
			if (imageError) {
				setIsLoading(false)
				return toast.error(imageError.message)
			}

			//Remove old images
			if (uploadModal.playlist?.image_path) {
				const { error: oldImageError } = await supabaseClient
					.storage
					.from(buckets.playlist_images)
					.remove([uploadModal.playlist?.image_path])

				if (oldImageError) {
					setIsLoading(false)
					return toast.error(oldImageError.message)
				}
			}

			const { error: supabaseError } = await supabaseClient
				.from('playlists')
				.update({
					title: values.title,
					description: values.description,
					image_path: imageData.path,
				})
				.eq('id', playlistId)

			if (supabaseError) {
				setIsLoading(false)
				return toast.error(supabaseError.message)
			}

			router.refresh()
			setIsLoading(false)
			toast.success('Playlist created!')
			reset()
			uploadModal.onClose()
		} catch (error) {
			toast.error('Something went wrong')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Modal
			className='md:max-w-[550px]'
			title='Upload your playlist'
			description='upload playlist description'
			isOpen={uploadModal.isOpen}
			onChange={onChange}
		>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='flex flex-col gap-y-4'
			>
				<div className='flex flex-row gap-4 '>
					<div className='w-[180px] h-[180px] shadow-xl'>
						<label
							htmlFor='playlist_img'
							className='w-[180px]  h-[180px] rounded-sm flex items-center justify-center'
						>
							{file !== ''
								? (
									<div className='relative aspect-square h-full w-full rounded-sm overflow-hidden'>
										<Image
											className='
            object-cover
          '
											src={file}
											fill
											alt='Img'
											sizes='100%'
										/>
									</div>
								)
								: <MusicNote size={50} />}
						</label>
						<Input
							className='bg-neutral-800 h-0 p-0'
							id='playlist_img'
							disabled={isLoading}
							type='file'
							accept='image/*'
							{...register('playlist_img', { required: true })}
							onChange={handleChange}
							placeholder='Song author'
						/>
					</div>

					<div className='flex flex-col gap-y-4 w-full'>
						<Input
							className='bg-neutral-800'
							id='title'
							disabled={isLoading}
							{...register('title', { required: true })}
							placeholder='Playlist title'
						/>
						<textarea
							id='description'
							className='border border-transparent px-3 py-3 text-sm resize-none outline-none w-full h-full bg-neutral-800 rounded-md placeholder:text-neutral-400 disabled:cursor-not-allowed focus:outline-none'
							{...register('description', { required: false })}
							placeholder='Write your description'
						/>
					</div>
				</div>
				<Button
					type='submit'
					className='w-[50%] mx-auto mt-2'
					disabled={isLoading}
				>
					Save
				</Button>
			</form>
		</Modal>
	)
}

export default UploadPlaylistModal
