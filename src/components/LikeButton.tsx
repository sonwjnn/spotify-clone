"use client";
import { useUser } from "@/hooks/useUser";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import useAuthModal from "@/hooks/useAuthModal";
import { toast } from "react-hot-toast";
import { twMerge } from "tailwind-merge";
import useUserStore from "@/stores/useUserStore";

interface LikeButtonProps {
  songId: string;
  size?: number;
  className?: string;
  playlistId?: string;
  isSelected?: boolean;
}

const LikeButton: React.FC<LikeButtonProps> = ({
  songId,
  size = 25,
  className,
  isSelected,
}) => {
  const router = useRouter();

  const { addLikedSong, removeLikedSong } = useUserStore();

  const { supabaseClient } = useSessionContext();

  const { user } = useUser();

  const authModal = useAuthModal();

  const [isLiked, setIsLiked] = useState<boolean>(false);

  const [isRequired, setRequired] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabaseClient
        .from("liked_songs")
        .select("*")
        .eq("user_id", user?.id)
        .eq("song_id", songId);

      if (!error && data.length) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
    };

    fetchData();
  }, [songId, supabaseClient, user?.id]);

  const handleLike = async () => {
    if (!user) return authModal.onOpen();
    if (isRequired) return;

    setRequired(true);

    if (isLiked) {
      const { error } = await supabaseClient
        .from("liked_songs")
        .delete()
        .eq("user_id", user.id)
        .eq("song_id", songId);

      if (error) return toast.error(error.message);
      setIsLiked(false);
      removeLikedSong(songId);
    } else {
      const { error } = await supabaseClient.from("liked_songs").insert({
        song_id: songId,
        user_id: user.id,
      });

      if (error) return toast.error(error.message);

      setIsLiked(true);
      // addLikedSong(songId)

      toast.success("Song liked!");
    }
    setRequired(false);

    router.refresh();
  };
  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

  return (
    <button
      onClick={handleLike}
      className={twMerge(
        `justify-center items-center ${
          isLiked || isSelected ? "flex" : "hidden"
        }  group-hover/:flex transition`,
        className
      )}
    >
      <Icon
        className={` transition ${
          isLiked
            ? "hover:brightness-125 text-[#22c55e]"
            : " hover:text-white text-neutral-400"
        }`}
        size={size}
      />
    </button>
  );
};

export default LikeButton;
