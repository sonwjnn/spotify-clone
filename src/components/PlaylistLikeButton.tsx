"use client";
import { useUser } from "@/hooks/useUser";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import useAuthModal from "@/hooks/useAuthModal";
import { toast } from "react-hot-toast";
import { twMerge } from "tailwind-merge";

interface PlaylistLikeButtonProps {
  size?: number;
  className?: string;
  playlistId?: string;
}

const PlaylistLikeButton: React.FC<PlaylistLikeButtonProps> = ({
  playlistId,
  size = 25,
  className,
}) => {
  const router = useRouter();

  const { supabaseClient } = useSessionContext();

  const { user } = useUser();

  const authModal = useAuthModal();

  const [isLiked, setIsLiked] = useState<boolean>(false);

  const [isRequired, setRequired] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabaseClient
        .from("liked_playlists")
        .select("*")
        .eq("user_id", user?.id)
        .eq("playlist_id", playlistId)
        .single();

      if (!error && data) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
    };

    fetchData();
  }, [playlistId, supabaseClient, user?.id]);

  const handleLike = async () => {
    if (!user) return authModal.onOpen();
    if (isRequired) return;

    setRequired(true);

    if (isLiked) {
      const { data, error } = await supabaseClient
        .from("liked_playlists")
        .delete()
        .eq("user_id", user.id)
        .eq("playlist_id", playlistId);

      if (error) return toast.error(error.message);
      setIsLiked(false);
    } else {
      const { error } = await supabaseClient.from("liked_playlists").insert({
        playlist_id: playlistId,
        user_id: user.id,
      });

      if (error) return toast.error(error.message);

      setIsLiked(true);

      toast.success("Playlist liked!");
    }
    setRequired(false);

    router.refresh();
  };
  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

  return (
    <button
      onClick={handleLike}
      className={twMerge(`justify-center items-center transition`, className)}
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

export default PlaylistLikeButton;
