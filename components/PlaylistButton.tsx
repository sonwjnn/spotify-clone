"use client";
import { useUser } from "@/hooks/useUser";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useAuthModal from "@/hooks/useAuthModal";
import { toast } from "react-hot-toast";
import { ClipLoader } from "react-spinners";

interface PlaylistButtonProps {
  type: "add" | "remove";
  songId: string;
  playlistId: string;
}

const PlaylistButton: React.FC<PlaylistButtonProps> = ({
  type,
  songId,
  playlistId,
}) => {
  const router = useRouter();

  const { supabaseClient } = useSessionContext();

  const { user } = useUser();

  const authModal = useAuthModal();

  const [isRequired, setRequired] = useState<boolean>(false);

  const handleLike = async () => {
    if (!user) return authModal.onOpen();

    if (isRequired) return;

    setRequired(true);

    if (type === "add") {
      const { data, error: playlistError } = await supabaseClient
        .from("playlists")
        .select("*")
        .eq("id", playlistId)
        .single();
      if (playlistError) return toast.error(playlistError.message);

      const song_ids = data.song_ids || [];

      const { error } = await supabaseClient.from("playlists").upsert({
        id: playlistId,
        song_ids: [...song_ids, songId],
        user_id: user.id,
      });

      if (error) return toast.error(error.message);

      toast.success("Added!");
    } else {
      const { data, error: playlistError } = await supabaseClient
        .from("playlists")
        .select("*")
        .eq("id", playlistId)
        .single();
      if (playlistError) return toast.error(playlistError.message);

      let song_ids = data.song_ids || [];

      if (song_ids.length) {
        song_ids = [...song_ids].filter((id) => id !== songId);
      }

      const { error } = await supabaseClient.from("playlists").upsert({
        id: playlistId,
        song_ids: song_ids,
        user_id: user.id,
      });

      if (error) return toast.error(error.message);

      toast.success("Removed!");
    }

    setRequired(false);

    router.refresh();
  };

  return (
    <button
      onClick={handleLike}
      className={`min-w-[50px] flex items-center justify-center h-8 rounded-full border border-white px-2 py-2 disabled:cursor-not-allowed disabled:opacity-50  font-semibold transition hover:scale-105 active:scale-100 bg-transparent text-white
`}
    >
      {isRequired ? (
        <ClipLoader color="white" size={18} />
      ) : type === "add" ? (
        "Add"
      ) : (
        "Remove"
      )}
    </button>
  );
};

export default PlaylistButton;
