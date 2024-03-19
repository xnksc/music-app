import { create } from "zustand";

interface PlaylistModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const usePlaylistModal = create<PlaylistModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
