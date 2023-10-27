'use client'

import {
  useSessionContext,
  useSupabaseClient,
} from '@supabase/auth-helpers-react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { useAuthModal } from '@/hooks/modals/use-auth-modal'

import { Modal } from '../ui/modal'

// const views: { id: ViewType; title: string }[] = [
//   { id: 'sign_in', title: 'Sign In' },
//   { id: 'sign_up', title: 'Sign Up' },
//   { id: 'magic_link', title: 'Magic Link' },
//   { id: 'forgotten_password', title: 'Forgotten Password' },
//   { id: 'update_password', title: 'Update Password' },
//   { id: 'verify_otp', title: 'Verify Otp' },
// ]

export const AuthModal = (): JSX.Element => {
  const router = useRouter()
  const supabaseClient = useSupabaseClient()
  const { session } = useSessionContext()

  const { onClose, isOpen } = useAuthModal()

  useEffect(() => {
    if (session) {
      router.refresh()
      onClose()
    }
  }, [session, router, onClose])

  const onChange = (open: boolean): void => {
    if (!open) {
      onClose()
    }
  }

  return (
    <Modal
      title="Login sownpify"
      description="Login to your account"
      isOpen={isOpen}
      onChange={onChange}
    >
      <Auth
        theme="dark"
        magicLink
        providers={['google', 'github']}
        supabaseClient={supabaseClient}
        appearance={{
          theme: ThemeSupa,
          style: {
            button: {
              borderRadius: '20px',
              borderColor: 'rgba(0,0,0,0)',
            },
            input: {
              borderRadius: '20px',
            },
          },
          variables: {
            default: {
              colors: {
                brandAccent: '#25d967',
                brand: '#22c55e',
              },
            },
          },
        }}
        socialLayout={'vertical'}
      />
    </Modal>
  )
}
