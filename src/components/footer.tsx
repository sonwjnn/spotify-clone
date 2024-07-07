'use client'

import { memo } from 'react'

import {
  bottomLinks,
  socialNetworkLinks,
  topLinkGroups,
} from '@/utils/constants'

import { LinkGroup } from '@/components/link-group'

// eslint-disable-next-line react/display-name
const Footer = memo(() => {
  return (
    <footer className="mt-10 flex flex-col px-8 pb-10 pt-2  ">
      <nav className="mt-8 flex justify-between">
        <div className="flex flex-wrap">
          {topLinkGroups.map(item => (
            <LinkGroup key={item.title} links={item.links} title={item.title} />
          ))}
        </div>
        <div className="flex h-fit flex-wrap justify-end gap-4">
          {socialNetworkLinks.map(item => {
            const Icon = item.icon
            return (
              <a
                className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-600 hover:brightness-110 dark:bg-neutral-800"
                key={item.title}
                href={item.link}
                target="_blank"
              >
                <Icon className="text-lg text-white" />
              </a>
            )
          })}
        </div>
      </nav>
      <nav className="flex items-center justify-between border-t border-solid border-zinc-400 pt-[26px] dark:border-neutral-400">
        <div className="flex flex-wrap gap-4">
          {bottomLinks.map((item, index) => (
            <a
              key={index}
              target="_blank"
              className="text-sm text-zinc-500 no-underline hover:text-zinc-600 dark:text-neutral-400 dark:hover:text-white"
              href={item.href}
            >
              {item.title}
            </a>
          ))}
        </div>
        <div className="text-sm  text-zinc-500 dark:text-neutral-400">
          <p>© {new Date().getFullYear()} Spotify AB</p>
        </div>
      </nav>
    </footer>
  )
})

export { Footer }
