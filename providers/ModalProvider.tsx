"use client";

import { AuthModal } from "@/components/AuthModal";
import { PlaylistModal } from "@/components/PlaylistModal";
import SubscribeModal from "@/components/SubscribeModal";
import { UploadModal } from "@/components/UploadModal";
import { ProductWithPrice } from "@/types";
import { useEffect, useState } from "react";

interface ModalProviderProps {
  products: ProductWithPrice[];
}

export const ModalProvider = ({ products }: ModalProviderProps) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return (
    <div>
      <AuthModal></AuthModal>
      <UploadModal></UploadModal>
      <PlaylistModal></PlaylistModal>
      <SubscribeModal products={products}></SubscribeModal>
    </div>
  );
};
