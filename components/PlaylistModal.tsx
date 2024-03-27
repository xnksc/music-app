"use client";
import { Modal } from "./Modal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { Input } from "./Input";
import { Button } from "./Button";
import toast from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { usePlaylistModal } from "@/hooks/useAddPlaylistModal";
import uniqid from "uniqid";

export const PlaylistModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const playlistModal = usePlaylistModal();
  const router = useRouter();
  const { user } = useUser();
  const supabaseClient = useSupabaseClient();
  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      image: null,
    },
  });

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      playlistModal.onClose();
    }
  };
  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);
      const imgFile = values.image?.[0];
      if (!imgFile || !user) {
        toast.error("Missing fields");
        return;
      }
      const uniqID = uniqid();
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
        .from("playlists")
        .insert({
          user_id: user.id,
          title: values.title,
          image_path: imgData.path,
        });
      if (supabaseError) {
        setIsLoading(false);
        return toast.error(supabaseError.message);
      }
      router.refresh();
      setIsLoading(false);
      toast.success("Playlist added!");
      reset();
      playlistModal.onClose();
    } catch (error) {
      toast.error("Error!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      className={isLoading ? "opacity-75 z-10" : "z-10"}
      title="Playlist"
      description="Add a playlist in your library"
      isOpen={playlistModal.isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-3">
        <Input
          id="title"
          disabled={isLoading}
          {...register("title", { required: true })}
          placeholder="Playlist title"
        ></Input>
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
          Create Playlist
        </Button>
      </form>
    </Modal>
  );
};
