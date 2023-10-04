import { usePalette } from "color-thief-react";
import useLoadImage from "@/hooks/useLoadImage";

const useGetColorImage = (imagePath: string, bucket: string) => {
  const imageUrl = useLoadImage(imagePath, bucket);

  const { data: dataColor } = usePalette(imageUrl as string, 10, "hex", {
    crossOrigin: "Anonymous",
    quality: 100,
  });

  const bgColor = dataColor?.[2] ?? "#e0e0e0";

  return imageUrl ? [bgColor, imageUrl] : [bgColor];
};

export default useGetColorImage;
