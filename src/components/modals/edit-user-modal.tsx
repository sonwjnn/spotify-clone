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
import { useUserModal } from '@/hooks/modals/use-user-modal'
import { useLoadImage } from '@/hooks/use-load-image'
import { useUser } from '@/hooks/use-user'
import { useUserStore } from '@/hooks/use-user-store'
import { MusicNote } from '@/public/icons'
import cn from '@/utils/cn'
import { buckets } from '@/utils/constants'

import { Spinner } from '../spinner'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Modal } from '../ui/modal'

export const EditUserModal: React.FC = () => {
  const {
    setAvatarUrl,
    setFullName,
    setBgColor: setBgColorStore,
  } = useUserStore()
  const [isLoading, setIsLoading] = useState(false)
  const userModal = useUserModal()
  const authModal = useAuthModal()

  const { user, userDetails } = useUser()
  const supabaseClient = useSupabaseClient()

  const initImageUrl = useLoadImage(
    userDetails?.avatar_url || '',
    buckets.users
  )

  const [file, setFile] = useState<string>(initImageUrl || '')
  const [bgColor, setBgColor] = useState<string>('')

  const { data: dataColor } = usePalette(file as string, 10, 'hex', {
    crossOrigin: 'Anonymous',
    quality: 100,
  })

  const { reset, handleSubmit, register } = useForm<FieldValues>({
    defaultValues: {
      full_name: userDetails?.full_name,
      user_img: null,
    },
  })

  useEffect(() => {
    // Update the default values when the playlist changes
    reset({
      full_name: userDetails?.full_name || '',
      user_img: null,
    })
    if (initImageUrl) setFile(initImageUrl)
    else setFile('')
  }, [userDetails])

  useEffect(() => {
    if (dataColor) {
      setBgColor(dataColor?.[2] ?? '#e0e0e0')
    }
  }, [dataColor])

  const onChange = (open: boolean): void => {
    if (!open) {
      reset()
      userModal.onClose()
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

      const imageFile = values.user_img?.[0]

      const isFormUnchanged =
        values.full_name === userDetails?.full_name && file === initImageUrl

      if (isFormUnchanged) {
        userModal.onClose()
        return
      }

      if (imageFile) {
        const uniqID = uniqid()

        // Upload images
        const { data: imageData, error: imageError } =
          await supabaseClient.storage
            .from(buckets.users)
            .upload(`user-image-${uniqID}`, imageFile, {
              cacheControl: '3600',
              upsert: false,
            })
        if (imageError) {
          setIsLoading(false)
          toast.error(imageError.message)
          return
        }

        // Remove old images
        if (userDetails?.avatar_url) {
          const { error: oldImageError } = await supabaseClient.storage
            .from(buckets.users)
            .remove([userDetails.avatar_url])

          if (oldImageError) {
            setIsLoading(false)
            toast.error(oldImageError.message)
            return
          }
        }

        const { error: supabaseError } = await supabaseClient
          .from('users')
          .update({
            full_name: values.full_name,
            avatar_url: imageData.path,
            bg_color: bgColor,
          })
          .eq('id', userDetails?.id)

        if (supabaseError) {
          setIsLoading(false)
          toast.error(supabaseError.message)
          return
        }

        setFullName(values.full_name)
        setAvatarUrl(imageData.path)
        setBgColorStore(bgColor)
        // router.refresh()
      } else {
        const { error: supabaseError } = await supabaseClient
          .from('users')
          .update({
            title: values.title,
            description: values.description,
          })
          .eq('id', userDetails?.id)

        if (supabaseError) {
          setIsLoading(false)
          toast.error(supabaseError.message)
          return
        }

        setFullName(values.full_name)
      }

      setIsLoading(false)
      toast.success('User edited!')
      reset()
      userModal.onClose()
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal
      className="md:max-w-[550px]"
      title="Edit details playlist"
      description="upload playlist description"
      isOpen={userModal.isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <div className="flex flex-col items-center gap-4 md:flex-row md:items-start ">
          <div className="group aspect-square h-[180px] w-[180px] rounded-full  shadow-xl">
            <label
              htmlFor="user_img"
              className="relative flex  h-full w-full cursor-pointer items-center justify-center  text-white"
            >
              <div
                className={cn(
                  `absolute inset-0 z-10 flex flex-col items-center justify-center gap-y-2 rounded-full bg-[rgba(0,0,0,.7)] opacity-0 transition group-hover:opacity-100`,
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
                <div className="relative h-full w-full overflow-hidden rounded-full">
                  <Image
                    className="object-cover"
                    src={file}
                    fill
                    alt="playlist img"
                    sizes="100%"
                  />
                </div>
              ) : (
                <div className="flex aspect-square h-full w-full items-center justify-center overflow-hidden">
                  <MusicNote size={50} />
                </div>
              )}
            </label>
            <Input
              className="h-0 bg-neutral-800 p-0"
              id="user_img"
              disabled={isLoading}
              type="file"
              accept="image/*"
              {...register('user_img', { required: false })}
              onChange={handleChange}
            />
          </div>
          <div className="flex h-[180px] w-full  gap-y-4 text-white ">
            <Input
              className="bg-neutral-800"
              id="full_name"
              disabled={isLoading}
              {...register('full_name', { required: false })}
              placeholder="user fullname"
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
