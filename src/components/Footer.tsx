import {
  bottomLinks,
  socialNetworkLinks,
  topLinkGroups,
} from '@/utils/constants'
import { FC, memo } from 'react'
import LinkGroup from './LinkGroup'

const Footer: FC = () => {
  return (
    <footer className="flex flex-col pt-2 pb-10 px-8 mt-10  ">
      <nav className="flex justify-between mt-8">
        <div className="flex flex-wrap">
          {topLinkGroups.map(links => (
            <LinkGroup key={links.title} groupLink={links} />
          ))}
        </div>
        <div className="flex gap-4 flex-wrap h-fit justify-end">
          {socialNetworkLinks.map(item => {
            const Icon = item.icon
            return (
              <a
                className="h-10 w-10 bg-neutral-800 hover:brightness-110 rounded-full flex items-center justify-center"
                key={item.title}
                href={item.link}
                target="_blank"
              >
                <Icon className="text-white text-lg" />
              </a>
            )
          })}
        </div>
      </nav>
      <nav className="flex justify-between items-center pt-[26px] border-t border-solid border-neutral-400">
        <div className="flex gap-4 flex-wrap">
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
        <div className="text-neutral-400 text-sm">
          <p>© 2023 Spotify AB</p>
        </div>
      </nav>
    </footer>
  )
}

export default memo(Footer)
