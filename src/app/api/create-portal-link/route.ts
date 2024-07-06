import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import { getURL } from '@/lib/helpers'
import { stripe } from '@/lib/stripe'
import { createOrRetrieveCustomer } from '@/lib/supabase-admin'

export async function POST(): Promise<NextResponse<unknown>> {
  try {
    const supabase = createRouteHandlerClient({
      cookies,
    })

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      throw Error('Could not get user')
    }

    const customer = await createOrRetrieveCustomer({
      uuid: user.id || '',
      email: user.email || '',
    })

    if (!customer) throw Error('Could not get customer')

    const { url } = await stripe.billingPortal.sessions.create({
      customer,
      return_url: `${getURL()}/account`,
    })

    return NextResponse.json({ url })
  } catch (error) {
    console.log(error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
