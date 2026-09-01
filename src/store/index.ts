import { AppStore, Language, Theme } from "./types";
import { create } from "zustand";

export const useAppStore = create<AppStore>((set) => ({
  theme: "light",
  language: "es",
  languages: ["es", "en"],
  setTheme: (theme: Theme) => set({ theme }),
  setLanguage: (language: Language) => set({ language }),
}));
