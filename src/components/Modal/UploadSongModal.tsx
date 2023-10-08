"use client";

import uniqid from "uniqid";
import { useState, useEffect } from "react";
import Modal from "./Modal";
import useUploadModal from "@/hooks/useUploadModal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "../Input";
import Button from "../Button";
import { toast } from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

const UploadSongModal = () => {
  const uploadModal = useUploadModal();
  const { user } = useUser();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [fileMp3, setFileMp3] = useState<string>("");
  const [duration, setDuration] = useState<number | null>(null);

  useEffect(() => {
    if (fileMp3) {
      const sound = new Audio(fileMp3);
      sound.addEventListener("loadedmetadata", () => {
        setDuration(sound.duration * 1000);
      });

      return () => {
        sound.removeEventListener("loadedmetadata", () => {
          setDuration(null);
        });
      };
    }
  }, [fileMp3]);

  useEffect(() => {
    console.log(duration);
  }, [duration]);

  const handleChange = (event: any) => {
    if (event.target.files[0]) {
      const file = URL.createObjectURL(event.target.files[0]);
      setFileMp3(file);
    }
  };

  const { reset, handleSubmit, register } = useForm<FieldValues>({
    defaultValues: {
      author: "",
      title: "",
      song: null,
      image: null,
    },
  });

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      uploadModal.onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);

      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];
      if (!user || !songFile) {
        toast.error("Missing fields");
        return;
      }
      const uniqID = uniqid();

      //Upload song
      const { data: songData, error: songError } = await supabaseClient.storage
        .from("songs")
        .upload(`song-${uniqID}`, songFile, {
          cacheControl: "3600",
          upsert: false,
        });
      if (songError) {
        setIsLoading(false);
        return toast.error("Failed song upload.");
      }

      //Upload images
      let imageData;
      if (imageFile) {
        const { data: imageUploadData, error: imageError } =
          await supabaseClient.storage
            .from("images")
            .upload(`image-${uniqID}`, imageFile, {
              cacheControl: "3600",
              upsert: false,
            });
        if (imageError) {
          setIsLoading(false);
          return toast.error("Failed image upload.");
        }
        imageData = imageUploadData;
      }

      const { error: supabaseError } = await supabaseClient
        .from("songs")
        .insert({
          user_id: user.id,
          title: values.title,
          author: values.author,
          image_path: imageData ? imageData.path : null,
          song_path: songData.path,
          duration_ms: duration,
        });
      if (supabaseError) {
        setIsLoading(false);
        return toast.error(supabaseError.message);
      }

      router.refresh();
      setIsLoading(false);
      toast.success("Song created!");
      reset();
      uploadModal.onOpen();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Modal
      title="Upload your songs"
      description="upload modal description"
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <Input
          className="bg-neutral-800"
          id="title"
          disabled={isLoading}
          {...register("title", { required: true })}
          placeholder="Song title..."
        />
        <Input
          className="bg-neutral-800"
          id="author"
          disabled={isLoading}
          {...register("author", { required: true })}
          placeholder="Song author..."
        />
        <div>
          <div className="pb-1">Select a song file</div>
          <Input
            className="bg-neutral-800 "
            id="song"
            disabled={isLoading}
            type="file"
            accept=".mp3"
            {...register("song", { required: true })}
            onChange={handleChange}
          />
        </div>

        <div>
          <div className="pb-1">Select an image</div>
          <Input
            className="bg-neutral-800 "
            id="image"
            disabled={isLoading}
            type="file"
            accept="image/*"
            {...register("image", { required: false })}
          />
        </div>
        <Button
          type="submit"
          className="w-[50%] mx-auto mt-2"
          disabled={isLoading}
        >
          Create
        </Button>
      </form>
    </Modal>
  );
};

export default UploadSongModal;