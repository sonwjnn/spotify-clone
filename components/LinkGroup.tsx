interface LinkGroupProps {
  groupLink: {
    title: string;
    links: {
      title: string;
      href: string;
      dataAttributes: { "data-ga-category": string; "data-ga-action": string };
    }[];
  };
}

const LinkGroup: React.FC<LinkGroupProps> = ({ groupLink }) => {
  return (
    <div className="flex flex-col mr-5 mb-8 min-w-[170px]">
      <h3 className="text-base font-bold text-white">{groupLink.title}</h3>
      <div className="flex flex-col text-neutral-400">
        {groupLink.links.map((item, index) => (
          <a
            className="no-underline text-base text-inherit my-2 hover:text-white hover:underline"
            target="_blank"
            key={index}
            href={item.href}
          >
            {item.title}
          </a>
        ))}
      </div>
    </div>
  );
};

export default LinkGroup;
