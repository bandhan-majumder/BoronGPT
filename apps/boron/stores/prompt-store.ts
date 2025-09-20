import { createStore } from "zustand/vanilla";

export type PromptState = {
  prompt: string;
};

export type PromptActions = {
  // getPrompt: () => void
  setPrompt: ({ prompt }: { prompt: string }) => void;
};

export type PromptStore = PromptState & PromptActions;

export const initPromptStore = (): PromptState => {
  return { prompt: new Date().getFullYear().toString() };
};

export const defaultInitState: PromptState = {
  prompt: "",
};

export const createPromptStore = (
  initState: PromptState = defaultInitState,
) => {
  return createStore<PromptStore>()((set) => ({
    ...initState,
    // getPrompt: () => set((state) => ({ prompt: state.prompt })),
    setPrompt: ({ prompt }) => set({ prompt }),
  }));
};
