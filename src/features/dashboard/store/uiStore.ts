import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface IUiStore {
  isOpen: boolean;
  toggle: () => void;
}

export const useUiStore = create<IUiStore>()(
  devtools((set) => ({
    isOpen: true,
    toggle: () => {
      set((state) => ({ isOpen: !state.isOpen }));
    },
  }))
);
