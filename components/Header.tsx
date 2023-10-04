"use client";

import useGetColorImage from "@/hooks/useGetColorImage";
import { Playlist } from "@/types";
import { buckets } from "@/utils/constants";
import { twMerge } from "tailwind-merge";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
  data?: Playlist;
  bgColor?: string;
}

const Header: React.FC<HeaderProps> = ({
  children,
  className,
  data,
  bgColor,
}) => {
  const [newBgColor] = useGetColorImage(
    data?.image_path!,
    buckets.playlist_images
  );

  return (
    <div
      className={twMerge(` h-fit  p-6 pt-16`, className)}
      style={{
        backgroundImage: `linear-gradient(to bottom, ${
          bgColor || newBgColor
        }, rgba(255,0,0,0))`,
      }}
    >
      {children}
    </div>
  );
};

export default Header;
