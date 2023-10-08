"use client";
import Image from "next/image";
import { MusicNote } from "@/public/icons";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

function CustomImage({ alt, className, ...props }) {
  const [src, setSrc] = useState(props.src);
  console.log(src);
  return (
    <Image
      {...props}
      className={twMerge(`object-cover`, className)}
      src={"/images/blur.png"}
      alt={alt} // To fix lint warning
      onError={() => setSrc("/images/blur.png")}
      placeholder="blur"
      blurDataURL="/images/blur.png"
    />
  );
}

export default CustomImage;
