"use client";
import useNavOpacity from "@/stores/useNavOpacity";
import { useEffect, useRef } from "react";
import ScrollbarProvider from "@/providers/ScrollbarProvider";

interface PageWrapperProps {
  children: React.ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  const { setOpacity } = useNavOpacity();

  const scrollRef = useRef<any>();

  useEffect(() => {
    setOpacity(0);
  }, []);

  useEffect(() => {
    const scrollElement = scrollRef.current.getScrollElement();

    const handleScroll = () => {
      const yAxis = scrollElement.scrollTop;

      if (yAxis > 64) {
        setOpacity(1);
      } else setOpacity(yAxis / 64);
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
