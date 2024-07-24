import create from "zustand";

interface toggleState {
  isSignup: boolean;
  isLinkPage: boolean;
  toggleForm: () => void;
  toggleLinkPage: () => void;
}

const useToggleStore = create<toggleState>((set) => ({
  isSignup: true,
  isLinkPage: true,
  toggleForm: () => set((state) => ({ isSignup: !state.isSignup })),
  toggleLinkPage: () => set((state) => ({ isLinkPage: !state.isLinkPage })),
}));

export default useToggleStore;
