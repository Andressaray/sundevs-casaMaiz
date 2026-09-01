/* eslint-disable max-nested-callbacks */
import { COLORS } from "@/theme/colors";

describe("theme / COLORS", () => {
  it("light y dark exponen exactamente las mismas claves", () => {
    expect(Object.keys(COLORS.light).sort()).toEqual(
      Object.keys(COLORS.dark).sort(),
    );
  });

  it("todos los valores son colores hex validos", () => {
    const hex = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/;

    Object.values(COLORS).forEach((palette) => {
      Object.entries(palette).forEach(([, value]) => {
        expect(value).toMatch(hex);
      });
    });
  });

  it("los fondos de light y dark son distintos", () => {
    expect(COLORS.light.bgPrimary).not.toBe(COLORS.dark.bgPrimary);
    expect(COLORS.light.textPrimary).not.toBe(COLORS.dark.textPrimary);
  });
});
