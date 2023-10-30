'use client'

import Image from 'next/image'
import type { useForm } from 'react-hook-form'
import { FiEdit2 } from 'react-icons/fi'
import { SyncLoader } from 'react-spinners'

import { MusicNote } from '@/public/icons'
import cn from '@/utils/cn'

import { Input } from './ui/input'

interface SingleImageDropzoneProps {
  url: string
  isLoading: boolean
  register: ReturnType<typeof useForm>['register']
  handleChange: (event: any) => void
}

export const SingleImageDropzone: React.FC<SingleImageDropzoneProps> = ({
  url,
  isLoading,
  register,
  handleChange,
}) => {
  return (
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
            <SyncLoader color="#404040" />
          ) : (
            <>
              <FiEdit2 size={36} color="#ffffff" />
              <p className="text-base text-white">Choose photo</p>
            </>
          )}
        </div>
        {url !== '' ? (
          <div className="relative aspect-square h-full w-full overflow-hidden rounded-sm">
            <Image
              className="object-cover"
              src={url}
              fill
              alt="playlist img"
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
        {...register('playlist_img', { required: false })}
        onChange={handleChange}
      />
    </div>
  )
}
