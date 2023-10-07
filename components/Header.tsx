"use client";

import useComponentSize from "@/hooks/useComponentSize";
import useHeader from "@/stores/useHeader";
import { Playlist, Song } from "@/types";
import { useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
  data?: Playlist;
  bgColor?: string;
  type?: string;
}

const Header: React.FC<HeaderProps> = ({
  children,
  className,
  data,
  bgColor,
  type,
}) => {
  const { setHeight } = useHeader();
  const headerRef = useRef<HTMLDivElement>(null);

  const size = useComponentSize(headerRef);

  useEffect(() => {
    setHeight(size.height);
  }, [size.height, setHeight]);

  return (
    <div
      className={twMerge(` h-fit flex items-end  p-6 pt-16`, className)}
      style={{
        backgroundImage: `linear-gradient(to bottom, ${
          bgColor || data?.bg_color
        }, rgba(255,0,0,0))`,
        height: type === "playlist" ? "340px" : undefined,
      }}
      ref={headerRef}
    >
      {children}
    </div>
  );
};

export default Header;
