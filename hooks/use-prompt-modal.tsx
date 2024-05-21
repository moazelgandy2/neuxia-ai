import { create } from "zustand";

interface usePromptModal {
  isOpen: boolean;
  text: string;
  resolution?: string;
  onOpen: () => void;
  onClose: () => void;
  onOpenWithText: (text: string, resolution?: string) => void;
}

export const usePromptModal = create<usePromptModal>((set) => ({
  isOpen: false,
  text: "",
  resolution: "",
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  onOpenWithText: (text: string, resolution?: string) => set({ isOpen: true, text, resolution }),
}));
