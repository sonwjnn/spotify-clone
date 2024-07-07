'use client'

import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { usePalette } from 'color-thief-react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import type { FieldValues, SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { LuImage } from 'react-icons/lu'
import uniqid from 'uniqid'

import { useAuthModal } from '@/store/modals/use-auth-modal'
import { useUserModal } from '@/store/modals/use-user-modal'
import { useLoadImage } from '@/hooks/use-load-image'
import { useUser } from '@/hooks/use-user'
import { useUserStore } from '@/store/use-user-store'
import { DeleteIcon, MusicNote } from '@/public/icons'
import { cn } from '@/lib/utils'
import { buckets } from '@/utils/constants'

import { Spinner } from '@/components/spinner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Modal } from '@/components/ui/modal'

export const EditUserModal = () => {
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

  const [file, setFile] = useState<string>('')
  const [bgColor, setBgColor] = useState<string>('')
  const [isRemove, setRemove] = useState<boolean>(false)

  const labelRef = useRef<HTMLLabelElement>(null)

  const { data: dataColor } = usePalette(file as string, 10, 'hex', {
    crossOrigin: 'Anonymous',
    quality: 100,
  })

  const { reset, handleSubmit, register, setValue } = useForm<FieldValues>({
    defaultValues: {
      full_name: userDetails?.full_name,
      user_img: null,
    },
  })
  useEffect(() => {
    if (userModal.isOpen) {
      setFile(initImageUrl || '')
    } else {
      setRemove(false)
    }
  }, [userModal.isOpen])

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
      } else if (isRemove) {
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
            avatar_url: null,
          })
          .eq('id', userDetails?.id)

        if (supabaseError) {
          setIsLoading(false)
          toast.error(supabaseError.message)
          return
        }

        setAvatarUrl('')
        setFullName(values.full_name)
      } else {
        const { error: supabaseError } = await supabaseClient
          .from('users')
          .update({
            full_name: values.full_name,
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

  const onRemove = (e: any): void => {
    e.preventDefault()
    setRemove(true)
    setValue('user_img', null)
    setFile('')
  }

  return (
    <Modal
      className="md:max-w-[550px]"
      title="Edit details user"
      description=""
      isOpen={userModal.isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <div className="flex flex-col items-center gap-4 md:flex-row  ">
          <div className="group aspect-square h-[180px] w-[180px] rounded-full  shadow-xl">
            <label
              htmlFor="user_img"
              className="relative flex  h-full w-full cursor-pointer items-center justify-center  text-white"
              ref={labelRef}
            >
              <div
                className={cn(
                  `absolute inset-0 z-10 flex flex-col items-center justify-center gap-y-2 rounded-full bg-[rgba(0,0,0,.7)] opacity-0 transition group-hover:opacity-100`,
                  isLoading && 'cursor-not-allowed opacity-100'
                )}
              >
                {isLoading ? (
                  <Spinner size="lg" />
                ) : (
                  <>
                    {file && (
                      <div className="absolute bottom-5 right-5 flex flex-col items-center justify-center gap-x-2 opacity-0 group-hover:opacity-100">
                        <Button
                          onClick={() => labelRef?.current?.click()}
                          className="flex gap-x-2 bg-transparent text-sm text-white"
                        >
                          <LuImage />
                          Change cover
                        </Button>
                        <Button
                          onClick={onRemove}
                          className="flex gap-x-2 bg-transparent text-sm text-white"
                        >
                          <DeleteIcon color="#991b1b" />
                          Remove
                        </Button>
                      </div>
                    )}
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
              className="h-0 bg-neutral-800 p-0 opacity-0"
              id="user_img"
              disabled={isLoading}
              type="file"
              accept="image/*"
              {...register('user_img', { required: false })}
              onChange={handleChange}
            />
          </div>
          <Input
            className="bg-neutral-800"
            id="full_name"
            disabled={isLoading}
            {...register('full_name', { required: false })}
            placeholder="user fullname"
          />
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
