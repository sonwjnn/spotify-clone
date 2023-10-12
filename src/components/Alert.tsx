import Image from 'next/image'
import Link from 'next/link'
import React, { useMemo } from 'react'

import logo from '@/public/images/logos/spotify_logo.svg'

import Box from './ui/Box'
import Button from './ui/Button'

interface AlertProps {
  type?: 'notfound' | 'wrong' | 'noSupportDevice'
}

const Alert: React.FC<AlertProps> = props => {
  const { type = 'notfound' } = props

  const { message } = useMemo(() => {
    switch (type) {
      case 'notfound':
        return {
          documentTitle: 'Page not found',
          message: `We can't seem to find the page you are looking for.`,
        }
      case 'wrong':
        return {
          documentTitle: 'Oops!',
          message: `Sorry, we couldn't complete your request.\n Please try refreshing this page or contact us.`,
        }
      case 'noSupportDevice':
        return {
          documentTitle: 'Unsupported device!',
          message: 'Desktop supported only!',
        }
      default:
        return {
          documentTitle: '',
          message: '',
        }
    }
  }, [type])

  return (
    <Box className="flex h-full w-full flex-col items-center justify-center">
      <div className={`relative h-[60px] w-[60px] overflow-hidden`}>
        <Image
          src={logo}
          alt="spotify logo"
          sizes="100%"
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col items-center p-10 ">
        <h2 className=" mb-4 mt-1 text-5xl font-bold text-white ">
          {type === 'notfound'
            ? 'Page not found'
            : 'Oops! Something went wrong'}
        </h2>
        <p className="mb-10 text-base text-neutral-400">{message}</p>
        {type !== 'noSupportDevice' && (
          <Link href={'/'}>
            <Button className="mb-9 bg-white px-8 py-3 text-black">Home</Button>
          </Link>
        )}
        <a
          className="block text-base font-bold text-white no-underline hover:underline"
          href="https://www.facebook.com/profile.php?id=100011436148089"
          target="_blank"
        >
          Help
        </a>
      </div>
    </Box>
  )
}

export default Alert
