'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

import { Button } from '@/components/ui/button'
import { useSubscribeModal } from '@/hooks/modals/use-subcribe-modal'
import { useUser } from '@/hooks/use-user'
import { postData } from '@/lib/helpers'

export const AccountContent = () => {
  const router = useRouter()

  const subscribeModal = useSubscribeModal()
  const { isLoading, subscription, user } = useUser()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/')
    }
  }, [isLoading, user, router])

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
    <div className="mb-7 min-h-[80vh] px-6">
      {!subscription ? (
        <div className="flex flex-col gap-y-4 ">
          <p className="text-white ">No active plan.</p>
          <Button onClick={subscribeModal.onOpen} className="w-[300px]">
            Subscribe
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-y-4 text-white ">
          <p>
            You are currency on the <b>{subscription?.prices?.product?.name}</b>{' '}
            plan.
          </p>

          <Button
            onClick={redirectToCustomerPortal}
            className="w-[300px]"
            disabled={loading || isLoading}
          >
            Open customer portal
          </Button>
        </div>
      )}
    </div>
  )
}
