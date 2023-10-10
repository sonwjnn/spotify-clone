"use client";

import { SearchIcon } from "@/public/icons";
import Input from "@/components/Input";
import useDebounce from "@/hooks/useDebounce";
import useMainLayout from "@/stores/useMainLayout";
import { Playlist, Song } from "@/types/types";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import MediaList from "@/components/MediaList";

interface SearchPlaylistProps {
  songs: Song[];
  playlist: Playlist;
}

const SearchPlaylist: React.FC<SearchPlaylistProps> = ({ playlist }) => {
  const { width } = useMainLayout();

  const { supabaseClient } = useSessionContext();

  const [value, setValue] = useState<string>("");
  const [songs, setSongs] = useState<Song[]>([]);
  const debouncedValue = useDebounce<string>(value, 500);

  useEffect(() => {
    const fetchDataByTitle = async () => {
      if (!debouncedValue) {
        setSongs([]);
        return;
      }
      const { data, error } = await supabaseClient
        .from("songs")
        .select("*")
        .ilike("title", `%${debouncedValue}%`)
        .order("created_at", { ascending: false });
      if (error) {
        console.log(error);
      }
      if (data) {
        const unaddedSongs = data.filter(
          (song) => !playlist?.song_ids?.includes(song.id)
        );
        setSongs(unaddedSongs as Song[]);
      }
    };

    fetchDataByTitle();
  }, [debouncedValue, supabaseClient, playlist?.song_ids]);

  return (
    <>
      <div className="px-6 mb-4">
        <div className='relative text-white text-3xl mt-2 font-semibold py-6 before:content-[""]  before:absolute before:h-[1px] before:w-full before:bg-neutral-800 before:top-0  before:left-0 truncate'>
          Lets find content for your playlist !
        </div>
        <Input
          placeholder={"Search for your song to want to listen to !"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={`rounded-full px-4 pl-10 bg-neutral-800 w-[40%] ${
            width <= 780 && "w-[60%]"
          } ${width <= 550 && "w-full"}`}
          startIcon={<SearchIcon size={18} />}
        />
      </div>

      <MediaList type="search" songs={songs} />
    </>
  );
};

export default SearchPlaylist;
