/* eslint-disable max-nested-callbacks */
import en from "@/config/languages/en.json";
import es from "@/config/languages/es.json";

type Dict = Record<string, unknown>;

const collectKeys = (obj: Dict, prefix = ""): string[] =>
  Object.entries(obj).flatMap(([key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === "object" && !Array.isArray(value)) {
      return collectKeys(value as Dict, path);
    }
    return [path];
  });

describe("config / diccionarios de idioma", () => {
  const esKeys = collectKeys(es as Dict).sort();
  const enKeys = collectKeys(en as Dict).sort();

  it("es.json y en.json tienen exactamente la misma estructura", () => {
    expect(esKeys).toEqual(enKeys);
  });

  it("ningun valor esta vacio", () => {
    [es, en].forEach((dict) => {
      collectKeys(dict as Dict).forEach((path) => {
        const value = path
          .split(".")
          .reduce<unknown>((acc, key) => (acc as Dict)?.[key], dict);
        expect(typeof value).toBe("string");
        expect((value as string).trim().length).toBeGreaterThan(0);
      });
    });
  });

  it("incluye las claves que consume la UI", () => {
    ["common.retry", "errors.general_error", "errors.load_menu_error"].forEach(
      (key) => {
        expect(esKeys).toContain(key);
        expect(enKeys).toContain(key);
      },
    );
  });
});
