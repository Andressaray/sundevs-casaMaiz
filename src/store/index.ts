import { create } from "zustand";
import { AppStore, Theme, Language } from "./type";

export const useAppStore = create<AppStore>((set) => ({
  theme: "light",
  language: "es",
  setTheme: (theme: Theme) => set({ theme }),
  setLanguage: (language: Language) => set({ language }),
}));
