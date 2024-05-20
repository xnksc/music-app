import { create } from "zustand";

interface PlayerStore {
  ids: string[];
  activeId?: string;
  setId: (id: string) => void;
  setIds: (ids: string[]) => void;
  reset: () => void;
  setVolume: (volume: number) => void;
  volume: number;
  // setIsMuted: (isMuted: boolean) => void;
  // isMuted: boolean;
}

export const usePlayer = create<PlayerStore>((set) => ({
  ids: [],
  volume: 1,
  activeId: undefined,
  // isMuted: false,
  // setIsMuted: (isMuted: boolean) => {
  //   set({ isMuted });
  //   console.log(isMuted);
  // },
  setId: (id: string) => set({ activeId: id }),
  setIds: (ids: string[]) => set({ ids }),
  setVolume: (volume: number) => {
    set({ volume: volume });
  },
  reset: () => set({ ids: [], activeId: undefined }),
}));
