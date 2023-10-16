import type { FC } from 'react'
import { memo } from 'react'

import {
  bottomLinks,
  socialNetworkLinks,
  topLinkGroups,
} from '@/utils/constants'

import LinkGroup from './link-group'

const Footer: FC = () => {
  return (
    <footer className="mt-10 flex flex-col px-8 pb-10 pt-2  ">
      <nav className="mt-8 flex justify-between">
        <div className="flex flex-wrap">
          {topLinkGroups.map(links => (
            <LinkGroup key={links.title} groupLink={links} />
          ))}
        </div>
        <div className="flex h-fit flex-wrap justify-end gap-4">
          {socialNetworkLinks.map(item => {
            const Icon = item.icon
            return (
              <a
                className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-800 hover:brightness-110"
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
      <nav className="flex items-center justify-between border-t border-solid border-neutral-400 pt-[26px]">
        <div className="flex flex-wrap gap-4">
          {bottomLinks.map((item, index) => (
            <a
              key={index}
              target="_blank"
              className="text-sm text-neutral-400 no-underline hover:text-white"
              href={item.href}
            >
              {item.title}
            </a>
          ))}
        </div>
        <div className="text-sm text-neutral-400">
          <p>© 2023 Spotify AB</p>
        </div>
      </nav>
    </footer>
  )
}

export default memo(Footer)
