'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'

import { useUser } from '@/hooks/use-user'
import { postData } from '@/libs/helpers'
import cn from '@/utils/cn'

import { Tooltip } from './ui/tooltip'

export const PremiumButton: React.FC = () => {
  const { isLoading, subscription } = useUser()

  const [loading, setLoading] = useState(false)

  const redirectToCustomerPortal: () => Promise<void> = async () => {
    setLoading(true)

    try {
      const { url } = await postData({
        url: '/api/create-portal-link',
      })

      window.location.assign(url)
    } catch (error) {
      if (error) {
        toast.error((error as Error).message)
        return
      }
    }
    setLoading(false)
  }
  return (
    <Tooltip
      text={
        subscription ? 'You are current premium' : 'Subcribe premium for better'
      }
    >
      <div
        onClick={() => {
          if (!subscription) redirectToCustomerPortal()
        }}
        className={cn(
          `relative bg-white px-5 py-2 text-sm w-full rounded-full border border-transparent text-black font-bold cursor-pointer transition animate-gradient-x `,
          {
            'cursor-not-allowed opacity-50': loading || isLoading,
            'bg-premium text-white': subscription,
          }
        )}
      >
        {subscription ? 'Premium' : 'Explore Premium'}
        {subscription && (
          <>
            <div className="absolute bottom-[-7px] left-[-9px] text-white">
              <svg
                width="10"
                height="10"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.93576 7.8709L11.9507 6.08342C11.9656 6.07517 11.9781 6.06309 11.9867 6.04842C11.9954 6.03375 12 6.01703 12 6C12 5.98297 11.9954 5.96625 11.9867 5.95158C11.9781 5.93691 11.9656 5.92483 11.9507 5.91658L7.93576 4.1291C7.92308 4.1291 7.91093 4.12407 7.90196 4.11514C7.893 4.1062 7.88797 4.09407 7.88797 4.08143L6.09559 0.0536246C6.0478 -0.0178749 5.9522 -0.0178749 5.9283 0.0536246L4.13593 4.08143C4.11203 4.10526 4.11203 4.1291 4.08814 4.1291L0.0493166 5.91658C0.0343752 5.92483 0.0219205 5.93691 0.0132481 5.95158C0.00457567 5.96625 0 5.98297 0 6C0 6.01703 0.00457567 6.03375 0.0132481 6.04842C0.0219205 6.06309 0.0343752 6.07517 0.0493166 6.08342L4.08814 7.8709C4.11203 7.8709 4.11203 7.89474 4.13593 7.91857L5.9283 11.9464C5.9522 12.0179 6.0478 12.0179 6.09559 11.9464L7.88797 7.91857C7.88797 7.90593 7.893 7.8938 7.90196 7.88487C7.91093 7.87593 7.92308 7.8709 7.93576 7.8709V7.8709Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>

            <div className="absolute right-[-8px] top-[-9px] text-white">
              <svg
                width="13"
                height="13"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.93576 7.8709L11.9507 6.08342C11.9656 6.07517 11.9781 6.06309 11.9867 6.04842C11.9954 6.03375 12 6.01703 12 6C12 5.98297 11.9954 5.96625 11.9867 5.95158C11.9781 5.93691 11.9656 5.92483 11.9507 5.91658L7.93576 4.1291C7.92308 4.1291 7.91093 4.12407 7.90196 4.11514C7.893 4.1062 7.88797 4.09407 7.88797 4.08143L6.09559 0.0536246C6.0478 -0.0178749 5.9522 -0.0178749 5.9283 0.0536246L4.13593 4.08143C4.11203 4.10526 4.11203 4.1291 4.08814 4.1291L0.0493166 5.91658C0.0343752 5.92483 0.0219205 5.93691 0.0132481 5.95158C0.00457567 5.96625 0 5.98297 0 6C0 6.01703 0.00457567 6.03375 0.0132481 6.04842C0.0219205 6.06309 0.0343752 6.07517 0.0493166 6.08342L4.08814 7.8709C4.11203 7.8709 4.11203 7.89474 4.13593 7.91857L5.9283 11.9464C5.9522 12.0179 6.0478 12.0179 6.09559 11.9464L7.88797 7.91857C7.88797 7.90593 7.893 7.8938 7.90196 7.88487C7.91093 7.87593 7.92308 7.8709 7.93576 7.8709V7.8709Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          </>
        )}
      </div>
    </Tooltip>
  )
}
