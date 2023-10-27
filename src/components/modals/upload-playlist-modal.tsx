'use client'

import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { usePalette } from 'color-thief-react'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import type { FieldValues, SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import uniqid from 'uniqid'

import { usePlaylistModal } from '@/hooks/modals/use-playlist-modal'
import { useLoadImage } from '@/hooks/use-load-image'
import { useUser } from '@/hooks/use-user'
import { MusicNote } from '@/public/icons'
import { buckets } from '@/utils/constants'

import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Modal } from '../ui/modal'

export const UploadPlaylistModal: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const uploadModal = usePlaylistModal()

  const playlistImgDefault = useLoadImage(
    uploadModal.playlist?.image_path!,
    buckets.playlist_images
  )
  const { user } = useUser()
  const supabaseClient = useSupabaseClient()
  const router = useRouter()
  const params = useParams()

  const [file, setFile] = useState<string>(playlistImgDefault || '')
  const [bgColor, setBgColor] = useState<string>('')

  const playlistId = uploadModal.playlist?.id || params.id

  const { data: dataColor } = usePalette(file as string, 10, 'hex', {
    crossOrigin: 'Anonymous',
    quality: 100,
  })

  useEffect(() => {
    if (dataColor) {
      setBgColor(dataColor?.[2] ?? '#e0e0e0')
    }
  }, [dataColor])

  const { reset, handleSubmit, register } = useForm<FieldValues>({
    defaultValues: {
      description: uploadModal.playlist?.description,
      title: uploadModal.playlist?.title,
      playlist_img: null,
    },
  })

  const onChange = (open: boolean): void => {
    if (!open) {
      reset()
      uploadModal.onClose()
    }
  }

  const handleChange = (event: any): void => {
    if (event.target.files[0]) {
      const imageUrl = URL.createObjectURL(event.target.files[0])
      setFile(imageUrl)
    }
  }

  const onSubmit: SubmitHandler<FieldValues> = async values => {
    try {
      setIsLoading(true)

      const imageFile = values.playlist_img?.[0]

      if (!user || !imageFile) {
        toast.error('Missing fields')
        return
      }

      const uniqID = uniqid()

      // Upload images
      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from(buckets.playlist_images)
          .upload(`playlist-image-${uniqID}`, imageFile, {
            cacheControl: '3600',
            upsert: false,
          })
      if (imageError) {
        setIsLoading(false)
        toast.error(imageError.message)
        return
      }

      // Remove old images
      if (uploadModal.playlist?.image_path) {
        const { error: oldImageError } = await supabaseClient.storage
          .from(buckets.playlist_images)
          .remove([uploadModal.playlist?.image_path])

        if (oldImageError) {
          setIsLoading(false)
          toast.error(oldImageError.message)
          return
        }
      }

      const { error: supabaseError } = await supabaseClient
        .from('playlists')
        .update({
          title: values.title,
          description: values.description,
          image_path: imageData.path,
          bg_color: bgColor,
        })
        .eq('id', playlistId)

      if (supabaseError) {
        setIsLoading(false)
        toast.error(supabaseError.message)
        return
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
      className="md:max-w-[550px]"
      title="Upload your playlist"
      description="upload playlist description"
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <div className="flex flex-row gap-4 ">
          <div className="h-[180px] w-[180px] shadow-xl">
            <label
              htmlFor="playlist_img"
              className="flex h-[180px]  w-[180px] items-center justify-center rounded-sm text-white"
            >
              {file !== '' ? (
                <div className="relative aspect-square h-full w-full overflow-hidden rounded-sm">
                  <Image
                    className="
            object-cover
          "
                    src={file}
                    fill
                    alt="Img"
                    sizes="100%"
                  />
                </div>
              ) : (
                <MusicNote size={50} />
              )}
            </label>
            <Input
              className="h-0 bg-neutral-800 p-0"
              id="playlist_img"
              disabled={isLoading}
              type="file"
              accept="image/*"
              {...register('playlist_img', { required: true })}
              onChange={handleChange}
              placeholder="Song author"
            />
          </div>

          <div className="flex w-full flex-col gap-y-4 text-white ">
            <Input
              className="bg-neutral-800"
              id="title"
              disabled={isLoading}
              {...register('title', { required: true })}
              placeholder="Playlist title"
            />
            <textarea
              id="description"
              className="h-full w-full resize-none rounded-md border  border-transparent bg-neutral-800 p-3 text-sm text-white outline-none placeholder:text-neutral-400 focus:outline-none disabled:cursor-not-allowed"
              {...register('description', { required: false })}
              placeholder="Write your description"
            />
          </div>
        </div>
        <Button
          type="submit"
          className="mx-auto mt-2 w-[50%]"
          disabled={isLoading}
        >
          Save
        </Button>
      </form>
    </Modal>
  )
}
