'use client'

import { useState } from 'react'
import { toast } from 'react-hot-toast'

import { useSubscribeModal } from '@/hooks/use-subcribe-modal'
import { useUser } from '@/hooks/use-user'
import { postData } from '@/libs/helpers'
import { getStripe } from '@/libs/stripe-client'
import type { Price, ProductWithPrice } from '@/types/types'

import { Button } from '../ui/button'
import { Modal } from '../ui/modal'

interface SubscribeModalProps {
  products: ProductWithPrice[]
}

const formatPrice = (price: Price): string => {
  const priceString = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: price.currency,
    minimumFractionDigits: 0,
  }).format((price?.unit_amount || 0) / 100)

  return priceString
}

export const SubscribeModal: React.FC<SubscribeModalProps> = ({ products }) => {
  let content = <div className="text-center">No products available</div>

  const { user, isLoading, subscription } = useUser()
  const [priceIdLoading, setPriceIdLoading] = useState<string>()
  const subscribeModal = useSubscribeModal()

  const onChange = (open: boolean): void => {
    if (!open) subscribeModal.onClose()
  }

  const handleCheckout: (price: Price) => Promise<void> = async (
    price: Price
  ) => {
    setPriceIdLoading(price.id)

    if (!user) {
      setPriceIdLoading(undefined)
      toast.error('Must be logged in')
      return
    }

    try {
      const { sessionId } = await postData({
        url: 'api/create-checkout-session',
        data: { price },
      })

      const stripe = await getStripe()
      stripe?.redirectToCheckout({ sessionId })
    } catch (error) {
      toast.error((error as Error).message)
    } finally {
      setPriceIdLoading(undefined)
    }
  }

  if (products.length) {
    content = (
      <div>
        {products.map(product => {
          if (!product.prices?.length) {
            return (
              <div className="text-white" key={product.id}>
                No prices available
              </div>
            )
          }

          return product.prices.map(price => (
            <Button
              key={price.id}
              onClick={() => handleCheckout(price)}
              disabled={isLoading || price.id === priceIdLoading}
              className="mb-4 "
            >
              {`Subscribe for ${formatPrice(price)} a ${price.interval}`}
            </Button>
          ))
        })}
      </div>
    )
  }

  if (subscription) {
    content = <div className="text-center text-white">Already subscribed</div>
  }
  return (
    <Modal
      title="Only for premium users"
      description="Listen to music with Spotify Premium"
      isOpen={subscribeModal.isOpen}
      onChange={onChange}
    >
      {content}
    </Modal>
  )
}
