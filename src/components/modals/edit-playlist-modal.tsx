'use client'

import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { usePalette } from 'color-thief-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import type { FieldValues, SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { FiEdit2 } from 'react-icons/fi'
import uniqid from 'uniqid'

import { useAuthModal } from '@/hooks/modals/use-auth-modal'
import { usePlaylistModal } from '@/hooks/modals/use-playlist-modal'
import { useLoadImage } from '@/hooks/use-load-image'
import { usePlaylist } from '@/hooks/use-playlist'
import { useUser } from '@/hooks/use-user'
import { useUserStore } from '@/hooks/use-user-store'
import { MusicNote } from '@/public/icons'
import type { Playlist } from '@/types/types'
import cn from '@/utils/cn'
import { buckets } from '@/utils/constants'

import { Spinner } from '../spinner'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Modal } from '../ui/modal'

export const EditPlaylistModal: React.FC = () => {
  const {
    playlist,
    setDescription,
    setImagePath,
    setTitle,
    setBgColor: setBgColorStore,
  } = usePlaylist()
  const [isLoading, setIsLoading] = useState(false)
  const uploadModal = usePlaylistModal()
  const authModal = useAuthModal()

  const initImageUrl = useLoadImage(
    playlist?.image_path || '',
    buckets.playlist_images
  )
  const { user } = useUser()
  const { updatePlaylist } = useUserStore()
  const supabaseClient = useSupabaseClient()

  const [file, setFile] = useState<string>(initImageUrl || '')
  const [bgColor, setBgColor] = useState<string>('')

  const { data: dataColor } = usePalette(file as string, 10, 'hex', {
    crossOrigin: 'Anonymous',
    quality: 100,
  })

  const { reset, handleSubmit, register } = useForm<FieldValues>({
    defaultValues: {
      description: playlist?.description,
      title: playlist?.title,
      playlist_img: null,
    },
  })

  useEffect(() => {
    // Update the default values when the playlist changes
    reset({
      description: playlist?.description || '',
      title: playlist?.title || '',
      playlist_img: null,
    })
    if (initImageUrl) setFile(initImageUrl)
    else setFile('')
  }, [playlist])

  useEffect(() => {
    if (dataColor) {
      setBgColor(dataColor?.[2] ?? '#e0e0e0')
    }
  }, [dataColor])

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
      if (!user) {
        authModal.onOpen()
        return
      }
      setIsLoading(true)

      const imageFile = values.playlist_img?.[0]

      const isFormUnchanged =
        values.title === playlist?.title &&
        values.description === playlist?.description &&
        file === initImageUrl

      if (isFormUnchanged) {
        uploadModal.onClose()
        return
      }

      if (imageFile) {
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
        if (playlist?.image_path) {
          const { error: oldImageError } = await supabaseClient.storage
            .from(buckets.playlist_images)
            .remove([playlist?.image_path])

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
          .eq('id', playlist?.id)

        if (supabaseError) {
          setIsLoading(false)
          toast.error(supabaseError.message)
          return
        }

        setTitle(values.title)
        setDescription(values.description)
        setImagePath(imageData.path)
        setBgColorStore(bgColor)
        // router.refresh()
      } else {
        const { error: supabaseError } = await supabaseClient
          .from('playlists')
          .update({
            title: values.title,
            description: values.description,
          })
          .eq('id', playlist?.id)

        if (supabaseError) {
          setIsLoading(false)
          toast.error(supabaseError.message)
          return
        }

        setTitle(values.title)
        setDescription(values.description)
      }

      setIsLoading(false)
      toast.success('Playlist edited!')
      reset()
      uploadModal.onClose()
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    if (playlist) {
      updatePlaylist(playlist as Playlist)
    }
  }, [playlist])

  return (
    <Modal
      className="md:max-w-[550px]"
      title="Edit details playlist"
      description="upload playlist description"
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <div className="flex flex-col items-center gap-4 md:flex-row md:items-start ">
          <div className="group  h-[180px] w-[180px] rounded-sm  shadow-xl">
            <label
              htmlFor="playlist_img"
              className="relative flex  h-full w-full cursor-pointer items-center justify-center  text-white"
            >
              <div
                className={cn(
                  `absolute inset-0 z-10 flex flex-col items-center justify-center gap-y-2 rounded-sm bg-[rgba(0,0,0,.7)] opacity-0 transition group-hover:opacity-100`,
                  isLoading && 'opacity-100 cursor-not-allowed'
                )}
              >
                {isLoading ? (
                  <Spinner size="lg" />
                ) : (
                  <>
                    <FiEdit2 size={36} color="#ffffff" />
                    <p className="text-base text-white">Choose photo</p>
                  </>
                )}
              </div>
              {file !== '' ? (
                <div className="relative aspect-square h-full w-full overflow-hidden rounded-sm">
                  <Image
                    className="object-cover"
                    src={file}
                    fill
                    alt="playlist img"
                    sizes="100%"
                  />
                </div>
              ) : (
                <div className="flex aspect-square h-full w-full items-center justify-center overflow-hidden rounded-sm">
                  <MusicNote size={50} />
                </div>
              )}
            </label>
            <Input
              className="h-0 bg-neutral-800 p-0"
              id="playlist_img"
              disabled={isLoading}
              type="file"
              accept="image/*"
              {...register('playlist_img', { required: false })}
              onChange={handleChange}
            />
          </div>

          <div className="flex h-[180px] w-full flex-col gap-y-4 text-white ">
            <Input
              className="bg-neutral-800"
              id="title"
              disabled={isLoading}
              {...register('title', { required: false })}
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
          className="ml-auto  mt-2 w-full md:w-[30%]"
          disabled={isLoading}
        >
          Save
        </Button>
      </form>
    </Modal>
  )
}
