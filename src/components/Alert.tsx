import React, { useMemo } from 'react'
import logo from '@/public/images/logos/spotify_logo.svg'
import Box from './ui/Box'
import Button from './ui/Button'
import Link from 'next/link'
import Image from 'next/image'

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
    }
  }, [type])

  return (
    <Box className="h-full w-full flex flex-col items-center justify-center">
      <div className={`h-[60px] w-[60px] overflow-hidden relative`}>
        <Image
          src={logo}
          alt="spotify logo"
          sizes="100%"
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col items-center p-10 ">
        <h2 className="text-white text-5xl font-bold space-[-2px] mt-1 mb-4 ">
          {type === 'notfound'
            ? 'Page not found'
            : 'Oops! Something went wrong'}
        </h2>
        <p className="text-base text-neutral-400 mb-10">{message}</p>
        {type !== 'noSupportDevice' && (
          <Link href={'/'}>
            <Button className="bg-white text-black px-8 py-3 mb-9">Home</Button>
          </Link>
        )}
        <a
          className="text-base text-white block font-bold no-underline hover:underline"
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
