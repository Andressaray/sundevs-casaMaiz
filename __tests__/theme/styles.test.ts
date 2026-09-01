import { Platform } from "react-native";
import {
  getRadius,
  getShadow,
  getSpacing,
  RADIUS,
  SPACING,
  TYPOGRAPHY,
} from "@/theme/styles";

describe("theme / tokens de estilo", () => {
  it("SPACING es una escala creciente", () => {
    const values = [
      SPACING.xs,
      SPACING.sm,
      SPACING.md,
      SPACING.lg,
      SPACING.xl,
      SPACING.xxl,
      SPACING.xxxl,
    ];

    expect(values).toEqual([...values].sort((a, b) => a - b));
    expect(values.every((value) => value > 0)).toBe(true);
  });

  it("TYPOGRAPHY define fontSize, lineHeight y fontFamily en cada variante", () => {
    Object.entries(TYPOGRAPHY).forEach(([, variant]) => {
      expect(variant.fontSize).toBeGreaterThan(0);
      expect(variant.lineHeight).toBeGreaterThan(0);
      expect(variant.fontFamily).toBeTruthy();
    });
  });

  describe("getRadius", () => {
    it("usa el radio de iOS en iOS", () => {
      Platform.OS = "ios";
      expect(getRadius()).toBe(RADIUS.ios);
    });

    it("usa el radio de Android en Android", () => {
      Platform.OS = "android";
      expect(getRadius()).toBe(RADIUS.android);
      Platform.OS = "ios";
    });
  });

  describe("getSpacing", () => {
    it("escala el spacing base en iOS", () => {
      Platform.OS = "ios";
      expect(getSpacing()).toBe(Math.round(SPACING.lg * 1.2));
      expect(getSpacing(2)).toBe(Math.round(SPACING.lg * 1.2 * 2));
    });

    it("no escala en Android", () => {
      Platform.OS = "android";
      expect(getSpacing()).toBe(SPACING.lg);
      Platform.OS = "ios";
    });
  });

  describe("getShadow", () => {
    it("devuelve sombra nativa en iOS", () => {
      Platform.OS = "ios";
      expect(getShadow()).toMatchObject({ shadowColor: expect.any(String) });
      expect(getShadow("medium").shadowOpacity).toBeGreaterThan(
        getShadow("light").shadowOpacity as number,
      );
    });

    it("devuelve elevation en Android", () => {
      Platform.OS = "android";
      expect(getShadow()).toEqual({ elevation: 2 });
      expect(getShadow("medium")).toEqual({ elevation: 4 });
      Platform.OS = "ios";
    });
  });
});
