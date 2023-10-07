"use client";
import useNavStyles from "@/stores/useNavStyles";
import { useEffect, useRef } from "react";
import ScrollbarProvider from "@/providers/ScrollbarProvider";
import useHeader from "@/stores/useHeader";

interface PageWrapperProps {
  hasPlayBtn?: boolean;
  children: React.ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  const { setOpacity, setPlayBtnVisible } = useNavStyles();
  const { height } = useHeader();

  const scrollRef = useRef<any>();

  useEffect(() => {
    setPlayBtnVisible(false);
    setOpacity(0);
  }, []);

  useEffect(() => {
    const scrollElement = scrollRef.current.getScrollElement();

    const handleScroll = () => {
      const yAxis = scrollElement.scrollTop;

      if (yAxis > 64) {
        setOpacity(1);
      } else {
        setOpacity(yAxis / 64);
      }

      if (yAxis > height + 14) {
        setPlayBtnVisible(true);
      } else setPlayBtnVisible(false);
    };

    scrollElement.addEventListener("scroll", handleScroll);

    return () => {
      scrollElement.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="bg-neutral-900 h-full w-full rounded-lg overflow-hidden relative">
      <ScrollbarProvider scrollRef={scrollRef}>{children}</ScrollbarProvider>
    </div>
  );
};

export default PageWrapper;
