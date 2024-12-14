import { create } from "zustand";
export const useCreatePostStore = create((set) => ({
  viewCreatePostModal: false,
  toggleCreatePostModal: () =>
    set((state) => ({ viewCreatePostModal: !state.viewCreatePostModal })),
}));
