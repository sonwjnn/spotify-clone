import type Stripe from 'stripe'

export interface UserDetails {
  id: string
  first_name: string
  last_name: string
  full_name?: string
  avatar_url?: string
  billing_address?: Stripe.Address
  payment_method?: Stripe.PaymentMethod[Stripe.PaymentMethod.Type]
  bg_color?: string
}

export interface Song {
  id: string
  user_id: string
  author: string
  title: string
  song_path: string
  image_path: string
  duration_ms: number
  created_at: string
}

export interface Playlist {
  id: string
  user_id: string
  song_ids?: string[]
  title: string
  description?: string
  image_path: string
  users?: UserDetails
  bg_color?: string
  created_at: string
  likes?: number
  duration_ms?: number
}

export interface Product {
  id: string
  active?: boolean
  name?: string
  description?: string
  image?: string
  metadata?: Stripe.Metadata
}

export interface ProductWithPrice extends Product {
  prices?: Price[]
}

export interface Price {
  id: string
  product_id?: string
  active?: boolean
  description?: string
  unit_amount?: number
  currency?: string
  type?: Stripe.Price.Type
  interval?: Stripe.Price.Recurring.Interval
  interval_count?: number
  trial_period_days?: number | null
  metadata?: Stripe.Metadata
  product?: Product
}

export interface Subscription {
  id: string
  user_id: string
  status?: Stripe.Subscription.Status
  metadata?: Stripe.Metadata
  price_id?: string
  quantity?: number
  cancel_at_period_end?: boolean
  created: string
  current_period_start: string
  current_period_end: string
  ended_at?: string
  cancel_at?: string
  canceled_at?: string
  trial_start?: string
  trial_end?: string
  prices?: Price
}
