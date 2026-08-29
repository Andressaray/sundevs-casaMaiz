export type Theme = "light" | "dark";
export type Language = "es" | "en" | "pt";

export interface AppStore {
  theme: Theme;
  language: Language;
  setTheme: (theme: Theme) => void;
  setLanguage: (language: Language) => void;
}