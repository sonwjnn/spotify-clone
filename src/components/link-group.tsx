type LinkGroupProps = {
  title: string
  links: {
    title: string
    href: string
    dataAttributes: { 'data-ga-category': string; 'data-ga-action': string }
  }[]
}

export const LinkGroup = ({ title, links }: LinkGroupProps) => {
  return (
    <div className="mb-8 mr-5 flex min-w-[170px] flex-col">
      <h3 className="text-base font-bold text-zinc-700 dark:text-white">
        {title}
      </h3>
      <div className="flex flex-col text-zinc-500 dark:text-neutral-400">
        {links.map((item, index) => (
          <a
            className="my-2 text-base text-inherit no-underline hover:text-zinc-600 hover:underline dark:hover:text-white"
            target="_blank"
            key={index}
            href={item.href}
          >
            {item.title}
          </a>
        ))}
      </div>
    </div>
  )
}
