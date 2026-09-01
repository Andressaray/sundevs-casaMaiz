import { act, renderHook } from "@testing-library/react-native";
import useTranslation from "@/hooks/useTranslations";
import { useAppStore } from "@/store";
import es from "@/config/languages/es.json";
import en from "@/config/languages/en.json";

describe("hooks / useTranslation", () => {
  it("traduce claves planas en el idioma por defecto (es)", () => {
    const { result } = renderHook(() => useTranslation());

    expect(result.current.language).toBe("es");
    expect(result.current.t("home")).toBe(es.home);
  });

  it("traduce claves anidadas con notacion de punto", () => {
    const { result } = renderHook(() => useTranslation());

    expect(result.current.t("common.retry")).toBe(es.common.retry);
    expect(result.current.t("errors.general_error")).toBe(
      es.errors.general_error,
    );
    expect(result.current.t("empty.home.title")).toBe(es.empty.home.title);
  });

  it("cambia de idioma con setLanguage", () => {
    const { result } = renderHook(() => useTranslation());

    act(() => {
      result.current.setLanguage("en");
    });

    expect(useAppStore.getState().language).toBe("en");
    expect(result.current.t("common.retry")).toBe(en.common.retry);
  });

  it("devuelve la propia clave cuando no existe", () => {
    const { result } = renderHook(() => useTranslation());

    expect(result.current.t("no.existe.esta.clave")).toBe(
      "no.existe.esta.clave",
    );
  });

  it("devuelve la clave cuando apunta a un objeto y no a un string", () => {
    const { result } = renderHook(() => useTranslation());

    expect(result.current.t("common")).toBe("common");
  });

  it("devuelve la clave si el idioma activo no tiene diccionario", () => {
    act(() => {
      useAppStore.setState({ language: "fr" as never });
    });

    const { result } = renderHook(() => useTranslation());

    expect(result.current.t("common.retry")).toBe("common.retry");
  });

  it("expone la lista de idiomas soportados", () => {
    const { result } = renderHook(() => useTranslation());

    expect(result.current.languages).toEqual(["es", "en"]);
  });
});
