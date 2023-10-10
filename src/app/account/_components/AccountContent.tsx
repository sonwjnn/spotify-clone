'use client'

import Button from '@/components/Button'
import useSubscribeModal from '@/hooks/useSubscribeModal'
import { useUser } from '@/hooks/useUser'
import { postData } from '@/libs/helpers'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

const AccountContent = () => {
  const router = useRouter()

  const subscribeModal = useSubscribeModal()
  const { isLoading, subscription, user } = useUser()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/')
    }
  }, [isLoading, user, router])

  const redirectToCustomerPortal = async () => {
    setLoading(true)

    try {
      const { url, error } = await postData({
        url: '/api/create-portal-link',
      })

      window.location.assign(url)
    } catch (error) {
      if (error) {
        return toast.error((error as Error).message)
      }
    }
    setLoading(false)
  }
  return (
    <div className="mb-7 px-6 min-h-[80vh]">
      {!subscription ? (
        <div className="flex flex-col gap-y-4">
          <p>No active plan.</p>
          <Button onClick={subscribeModal.onOpen} className="w-[300px]">
            Subscribe
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-y-4">
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

export default AccountContent
