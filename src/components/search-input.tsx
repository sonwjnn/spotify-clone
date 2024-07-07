'use client'

import { useRouter } from 'next/navigation'
import qs from 'query-string'
import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { useDebounce } from '@/hooks/use-debounce'
import { SearchIcon } from '@/public/icons'

import { Input } from '@/components/ui/input'

type SearchInputProps = {
  url: string
  placeholder?: string
  className?: string
}

export const SearchInput = ({
  className,
  url,
  placeholder,
}: SearchInputProps) => {
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
      className={twMerge(` rounded-full px-4 pl-10`, className)}
      startIcon={
        <SearchIcon size={18} className="text-zinc-600 dark:text-white" />
      }
    />
  )
}
