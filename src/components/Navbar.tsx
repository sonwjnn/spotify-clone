"use client";

import { usePathname, useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import {
  HomeActiveIcon,
  HomeIcon,
  SearchActiveIcon,
  SearchIcon,
} from "@/public/icons";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Button from "./Button";
import useAuthModal from "@/hooks/useAuthModal";
import { FaUserAlt } from "react-icons/fa";
import { useUser } from "@/hooks/useUser";
import { toast } from "react-hot-toast";
import usePlayer from "@/stores/usePlayer";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import useNavStyles from "@/stores/useNavStyles";
import { Playlist, Song } from "@/types/types";
import useOnPlay from "@/hooks/useOnPlay";
import PlayButton from "./PlayButton";

interface NavbarProps {
  songs?: Song[];
  playlist?: Playlist;
  className?: string;
  darker?: boolean;
  data?: Playlist;
  bgColor?: string;
  hasPlayBtn?: boolean;
  title?: string;
  showTitle?: boolean;
}

const Navbar: React.FC<NavbarProps> = (props) => {
  const {
    playlist,
    songs,
    className,
    data,
    darker = true,
    bgColor,
    hasPlayBtn = false,
    title = "",
    showTitle = false,
  } = props;

  const router = useRouter();
  const authModal = useAuthModal();
  const { user } = useUser();
  const player = usePlayer();

  const { opacity, playBtnVisible } = useNavStyles();

  const supabaseClient = useSupabaseClient();

  const pathname = usePathname();

  const onPlay = useOnPlay(songs as Song[]);
  const [isPlaying, setPlaying] = useState(false);
  const [isTracking, setTracking] = useState(false);

  const routes = useMemo(
    () => [
      {
        icon: [HomeActiveIcon, HomeIcon],
        label: "Home",
        active: pathname !== "/search",
        href: "/",
      },
      {
        icon: [SearchActiveIcon, SearchIcon],
        label: "Search",
        active: pathname === "/search",
        href: "/search",
      },
    ],
    [pathname]
  );

  useEffect(() => {
    if (isTracking) {
      setPlaying(player.isPlaying);
    }
  }, [player.isPlaying, isTracking]);

  const handleClickPlay = () => {
    if (!isTracking && songs?.length) {
      setTracking(true);
      onPlay(songs[0].id);
    } else {
      player.handlePlay();
    }
  };

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    player.reset();
    router.refresh();

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged out!");
    }
  };

  return (
    <div
      className={twMerge(
        `absolute top-0 right-0 left-0 h-16  rounded-t-lg `,
        className
      )}
    >
      <div
        className={twMerge(
          `rounded-t-lg absolute top-0 h-full left-0 ${
            darker && "brightness-50"
          }  right-0 z-10 `
        )}
        style={{
          opacity: opacity,
          backgroundColor: bgColor || data?.bg_color,
        }}
      ></div>

      <div
        className={` h-full w-full mb-4 flex items-center justify-between  absolute top-0  left-0 right-0  px-6 z-10`}
      >
        <div className="hidden md:flex gap-x-2 min-w-0  items-center ">
          <button
            className="rounded-full bg-black items-center justify-center transition active:scale-95"
            onClick={() => router.back()}
          >
            <RxCaretLeft className="text-white" size={35} />
          </button>
          <button
            className="rounded-full bg-black items-center justify-center transition active:scale-95"
            onClick={() => router.forward()}
          >
            <RxCaretRight className="text-white" size={35} />
          </button>

          <div
            className={`ml-1  flex gap-x-2 transition  items-center w-full min-w-0 flex-grow max-w-[400px] ${
              hasPlayBtn && playBtnVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <PlayButton
              className="opacity-100 translate-y-0  h-12 w-12 hover:scale-105"
              onClick={handleClickPlay}
              isPlaying={isPlaying}
            />

            <span className="text-2xl truncate font-bold mr-1">
              {playlist?.title}
            </span>
          </div>
        </div>

        <div className="flex md:hidden gap-x-2 items-center ">
          {routes.map((item, index) => {
            const Icon = item.active ? item.icon[0] : item.icon[1];
            return (
              <Link
                key={index}
                href={item.href}
                className={twMerge(
                  `flex rounded-full w-10 h-10 bg-white p-2 items-center justify-center hover:opacity-75 transition`
                )}
              >
                <Icon size={22} color="#000000" />
              </Link>
            );
          })}
        </div>

        <div className="flex justify-between items-center   gap-x-4">
          {user ? (
            <div className="flex gap-x-4 items-center">
              <Button onClick={handleLogout} className="bg-white px-6 py-2">
                Logout
              </Button>
              <Button
                onClick={() => router.push("/account")}
                className="bg-white"
              >
                <FaUserAlt />
              </Button>
            </div>
          ) : (
            <>
              <div>
                <Button
                  className="bg-transparent text-neutral-300 font-medium"
                  onClick={authModal.onOpen}
                >
                  Sign up
                </Button>
              </div>
              <div>
                <Button
                  className="bg-transparent text-neutral-300 font-medium"
                  onClick={authModal.onOpen}
                >
                  Log in
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
