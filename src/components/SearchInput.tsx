'use client'

import qs from 'query-string'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { SearchIcon } from '@/public/icons'

import useDebounce from '@/hooks/useDebounce'

import Input from './ui/Input'
import { twMerge } from 'tailwind-merge'

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
      url: url,
      query: query,
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
