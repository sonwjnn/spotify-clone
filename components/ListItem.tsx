"use client";

import { MusicNote } from "@/public/icons";
import useUserStore from "@/stores/useUserStore";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ListItemProps {
  image: string;
  name: string;
  href: string;
}

const ListItem: React.FC<ListItemProps> = ({ image, name, href }) => {
  const router = useRouter();
  const user = useUserStore();

  const onClick = () => {
    router.push(href);
  };

  return (
    <div
      className={` cursor-pointer rounded-md p-2 transition w-full hover:bg-neutral-800/50 `}
    >
      <div onClick={onClick} className="flex item-center gap-x-3">
        <div className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden">
          {image ? (
            <Image
              fill
              src={image}
              sizes="100%"
              alt="Media-Item"
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-neutral-800">
              <MusicNote size={20} />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-y-1 overflow-hidden">
          <p className="text-white truncate">{name}</p>
          <p className="text-neutral-400 text-sm truncate">{`Playlist - ${user.likedSongs.length} songs`}</p>
        </div>
      </div>
    </div>
  );
};

export default ListItem;
