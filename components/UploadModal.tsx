"use client";
import { useUploadModal } from "@/hooks/useUploadModal";
import { Modal } from "./Modal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { Input } from "./Input";
import { Button } from "./Button";
import toast from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import uniqid from "uniqid";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

export const UploadModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const uploadModal = useUploadModal();
  const router = useRouter();
  const { user } = useUser();
  const supabaseClient = useSupabaseClient();
  const { register, handleSubmit, reset } = useForm<FieldValues>({
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
      const imgFile = values.image?.[0];
      const songFile = values.song?.[0];
      if (!imgFile || !songFile || !user) {
        toast.error("Missing fields");
        return;
      }
      const uniqID = uniqid();

      // upl song
      const { data: songData, error: songError } = await supabaseClient.storage
        .from("songs")
        .upload(`song-${values.title}-${uniqID}`, songFile, {
          cacheControl: "3600",
          upsert: false,
        });
      if (songError) {
        setIsLoading(false);
        return toast.error("Failed to upload song");
      }
      // upl img
      const { data: imgData, error: imgError } = await supabaseClient.storage
        .from("images")
        .upload(`img-${values.title}-${uniqID}`, imgFile, {
          cacheControl: "3600",
          upsert: false,
        });
      if (imgError) {
        setIsLoading(false);
        return toast.error("Failed to upload image");
      }
      const { error: supabaseError } = await supabaseClient
        .from("songs")
        .insert({
          user_id: user.id,
          title: values.title,
          author: values.author,
          image_path: imgData.path,
          song_path: songData.path,
        });
      if (supabaseError) {
        setIsLoading(false);
        return toast.error(supabaseError.message);
      }
      router.refresh();
      setIsLoading(false);
      toast.success("Song added!");
      reset();
      uploadModal.onClose();
    } catch (error) {
      toast.error("Error!");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Modal
      className={isLoading ? "opacity-75 z-20" : "z-20"}
      title="Song"
      description="Upload song from your storage"
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-3">
        <Input
          id="title"
          disabled={isLoading}
          {...register("title", { required: true })}
          placeholder="Song title"
          className="border-teal-500"
        ></Input>
        <Input
          id="author"
          disabled={isLoading}
          {...register("author", { required: true })}
          placeholder="Song author"
        ></Input>
        <div>
          <div className="pb-1">Select a file</div>
          <Input
            id="song"
            type="file"
            disabled={isLoading}
            accept=".mp3"
            {...register("song", { required: true })}
          ></Input>
        </div>
        <div>
          <div className="pb-1">Select an image</div>
          <Input
            id="image"
            type="file"
            disabled={isLoading}
            accept="image/*"
            {...register("image", { required: true })}
          ></Input>
        </div>
        <Button
          className="mt-6 bg-cyan-600 hover:bg-cyan-500/85 active:bg-cyan-500"
          disabled={isLoading}
          type="submit"
        >
          Create
        </Button>
      </form>
    </Modal>
  );
};
