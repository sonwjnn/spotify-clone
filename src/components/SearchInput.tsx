'use client'

import { useRouter } from 'next/navigation'
import qs from 'query-string'
import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import useDebounce from '@/hooks/useDebounce'
import { SearchIcon } from '@/public/icons'

import Input from './ui/Input'

interface SearchInputProps {
  url: string
  placeholder?: string
  className?: string
}

const SearchInput: React.FC<SearchInputProps> = ({
  className,
  url,
  placeholder,
}) => {
  const router = useRouter()

  const [value, setValue] = useState<string>('')
  const debouncedValue = useDebounce<string>(value, 500)

  useEffect(() => {
    const query = {
      title: debouncedValue,
    }

    const stringifiedUrl = qs.stringifyUrl({
      url,
      query,
    })

    router.push(stringifiedUrl, { scroll: false })
  }, [debouncedValue, router, url])

  return (
    <Input
      placeholder={placeholder || 'Search for your song to want to listen to !'}
      value={value}
      onChange={e => setValue(e.target.value)}
      className={twMerge(` rounded-full px-4 pl-10 bg-neutral-800`, className)}
      startIcon={<SearchIcon size={18} />}
    />
  )
}

export default SearchInput
