export type Theme = "light" | "dark";
export type Language = "es" | "en";
export type Languages = ["es", "en"];

export interface AppStore {
  theme: Theme;
  language: Language;
  languages: Languages;
  setTheme: (_theme: Theme) => void;
  setLanguage: (_language: Language) => void;
}
