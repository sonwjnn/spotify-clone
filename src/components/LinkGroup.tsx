interface LinkGroupProps {
  groupLink: {
    title: string
    links: {
      title: string
      href: string
      dataAttributes: { 'data-ga-category': string; 'data-ga-action': string }
    }[]
  }
}

const LinkGroup: React.FC<LinkGroupProps> = ({ groupLink }) => {
  return (
    <div className="mb-8 mr-5 flex min-w-[170px] flex-col">
      <h3 className="text-base font-bold text-white">{groupLink.title}</h3>
      <div className="flex flex-col text-neutral-400">
        {groupLink.links.map((item, index) => (
          <a
            className="my-2 text-base text-inherit no-underline hover:text-white hover:underline"
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

export default LinkGroup
