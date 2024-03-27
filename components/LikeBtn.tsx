"use client";

import { useAuthModal } from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import { cn } from "@/libs/helpers";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { VscHeart, VscHeartFilled } from "react-icons/vsc";

interface LikeBtnProps {
  songId: string;
  size?: number;
  classname?: string;
}

export const LikeBtn = ({ songId, size = 20, classname }: LikeBtnProps) => {
  const router = useRouter();
  const { supabaseClient } = useSessionContext();
  const authModal = useAuthModal();
  const { user } = useUser();

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (!user?.id) {
      return;
    }
    const fetchData = async () => {
      const { data, error } = await supabaseClient
        .from("liked_songs")
        .select("*")
        .eq("user_id", user.id)
        .eq("song_id", songId)
        .single();
      if (!error && data) {
        setIsLiked(true);
      }
    };
    fetchData();
  }, [songId, supabaseClient, user?.id]);

  const Icon = isLiked ? VscHeartFilled : VscHeart;

  const handleLike = async () => {
    if (!user) {
      return authModal.onOpen();
    }
    if (isLiked) {
      const { error } = await supabaseClient
        .from("liked_songs")
        .delete()
        .eq("user_id", user.id)
        .eq("song_id", songId);
      if (error) {
        toast.error(error.message);
      } else setIsLiked(false);
    } else {
      const { error } = await supabaseClient.from("liked_songs").insert({
        song_id: songId,
        user_id: user.id,
      });
      if (error) {
        toast.error(error.message);
      } else {
        setIsLiked(true);
      }
    }
    router.refresh();
  };

  return (
    <button
      onClick={handleLike}
      className={cn(
        isLiked
          ? "text-cyan-600 hover:text-cyan-500"
          : "text-neutral-400 hover:text-neutral-100",
        classname
      )}
    >
      <Icon size={size}></Icon>
    </button>
  );
};
