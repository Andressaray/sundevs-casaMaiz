import en from "@/config/languages/en.json";
import es from "@/config/languages/es.json";
import { useAppStore } from "@/store";

type TranslationValue = string | Record<string, unknown>;
type TranslationObject = Record<string, TranslationValue>;

const getNestedTranslation = (obj: TranslationObject, path: string): string => {
  const keys = path.split(".");
  let current: TranslationValue | TranslationObject | undefined = obj;

  for (const key of keys) {
    if (current && typeof current === "object" && key in current) {
      const value = (current as Record<string, unknown>)[key];
      current = value as TranslationValue | TranslationObject | undefined;
    } else {
      return path;
    }
  }

  if (typeof current === "string") {
    return current;
  }

  return path;
};

const useTranslation = () => {
  const { language, languages, setLanguage } = useAppStore();

  const t = (key: string): string => {
    try {
      const translations: Record<string, TranslationObject> = {
        en: en as TranslationObject,
        es: es as TranslationObject,
      };

      if (!translations[language]) {
        return key;
      }

      return getNestedTranslation(translations[language], key);
    } catch {
      return key;
    }
  };

  return {
    language,
    languages,
    setLanguage,
    t,
  };
};

export default useTranslation;
