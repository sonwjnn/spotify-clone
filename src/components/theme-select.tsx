'use client'

import { RiMoonClearFill } from 'react-icons/ri'
import { RiSunLine } from 'react-icons/ri'
import { RiSettingsFill } from 'react-icons/ri'
import { MdComputer } from 'react-icons/md'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'
import { Tooltip } from '@/components/ui/tooltip'
import { useMemo } from 'react'

const ThemeSelect = () => {
  const { theme, setTheme } = useTheme()

  const options = useMemo(
    () => [
      {
        icon: <MdComputer />,
        onClick: () => setTheme('system'),
        isActive: theme === 'system',
        tooltipLabel: 'System',
      },
      {
        icon: <RiSunLine />,
        onClick: () => setTheme('light'),
        isActive: theme === 'light',
        tooltipLabel: 'Light',
      },
      {
        icon: <RiMoonClearFill />,
        onClick: () => setTheme('dark'),
        isActive: theme === 'dark',
        tooltipLabel: 'Dark',
      },
    ],
    [theme]
  )

  return (
    <div className="flex cursor-pointer items-center justify-between rounded-sm px-3 py-2 text-sm transition-colors hover:bg-zinc-700/10 dark:hover:bg-neutral-700">
      <div className="flex items-center gap-x-1">
        <RiSettingsFill size={18} className="mr-1 text-neutral-400" /> Theme
      </div>
      <div className="flex gap-x-1 rounded-full border border-neutral-400 dark:border-neutral-600">
        {options.map((option, index) => (
          <Item key={index} {...option} />
        ))}
      </div>
    </div>
  )
}

const Item = ({
  icon,
  onClick,
  isActive,
  tooltipLabel,
}: {
  icon: React.ReactNode
  onClick: () => void
  isActive: boolean
  tooltipLabel: string
}) => {
  const { theme } = useTheme()
  const handleClick = (e: any) => {
    e.stopPropagation()

    onClick()
  }

  return (
    <Tooltip text={tooltipLabel}>
      <div
        className={cn(
          'rounded-full border border-transparent  p-0.5 text-zinc-500 hover:brightness-110',
          isActive &&
            'border-neutral-300 bg-zinc-700/10 dark:border-neutral-600',
          isActive && theme === 'dark' && ' text-indigo-500',
          isActive && theme === 'light' && 'text-yellow-500'
        )}
        onClick={handleClick}
      >
        {icon}
      </div>
    </Tooltip>
  )
}

export default ThemeSelect
