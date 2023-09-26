'use client'
import uniqid from 'uniqid'
import { useState } from 'react'
import Modal from './Modal'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import Input from './Input'
import Button from './Button'
import { toast } from 'react-hot-toast'
import { useUser } from '@/hooks/useUser'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation'
import usePlaylistModal from '@/hooks/usePlaylistModal'
import { MusicNote } from '@/assets/icons'
import Image from 'next/image'

const UploadPlaylistModal = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [file, setFile] = useState<string>('')
	const uploadModal = usePlaylistModal()
	const { user } = useUser()
	const supabaseClient = useSupabaseClient()
	const router = useRouter()

	const { reset, handleSubmit, register } = useForm<FieldValues>({
		defaultValues: {
			author: '',
			title: '',
			song: null,
			image: null,
		},
	})

	const onChange = (open: boolean) => {
		if (!open) {
			reset()
			uploadModal.onClose()
		}
	}

	const handleChange = (event: any) => {
		setFile(URL.createObjectURL(event.target.files[0]))
	}

	const onSubmit: SubmitHandler<FieldValues> = async (values) => {
		try {
			setIsLoading(true)

			const imageFile = values.image?.[0]
			const songFile = values.song?.[0]
			if (!user || !imageFile || !songFile) {
				toast.error('Missing fields')
				return
			}
			const uniqID = uniqid()

			//Upload song
			const { data: songData, error: songError } = await supabaseClient
				.storage
				.from('songs')
				.upload(`song-${values.title}-${uniqID}`, songFile, {
					cacheControl: '3600',
					upsert: false,
				})
			if (songError) {
				setIsLoading(false)
				return toast.error('Failed song upload.')
			}

			//Upload images
			const { data: imageData, error: imageError } = await supabaseClient
				.storage
				.from('images')
				.upload(`image-${values.title}-${uniqID}`, imageFile, {
					cacheControl: '3600',
					upsert: false,
				})
			if (imageError) {
				setIsLoading(false)
				return toast.error('Failed image upload.')
			}

			const { error: supabaseError } = await supabaseClient
				.from('songs')
				.insert({
					user_id: user.id,
					title: values.title,
					author: values.author,
					image_path: imageData.path,
					song_path: songData.path,
				})
			if (supabaseError) {
				setIsLoading(false)
				return toast.error(supabaseError.message)
			}

			router.refresh()
			setIsLoading(false)
			toast.success('Song created!')
			reset()
			uploadModal.onOpen()
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
							htmlFor='image-playlist'
							className='w-[180px]  h-[180px] flex items-center justify-center'
						>
							{file !== ''
								? (
									<div className='relative aspect-square h-full w-full rounded-md overflow-hidden'>
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
							className='bg-neutral-800 hidden'
							id='image-playlist'
							disabled={isLoading}
							type='file'
							accept='image/*'
							{...register('image', { required: true })}
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
							className='border border-transparent px-3 py-3 text-sm resize-none outline-none w-full h-full bg-neutral-800 rounded-md placeholder:text-neutral-400 disabled:cursor-not-allowed focus:outline-none'
							placeholder='Write your description'
						/>
					</div>
				</div>
				<Button
					type='submit'
					className='w-[50%] mx-auto mt-2'
					disabled={isLoading}
				>
					Create
				</Button>
			</form>
		</Modal>
	)
}

export default UploadPlaylistModal
