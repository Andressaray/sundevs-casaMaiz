import type { ApiResponse, LayoutBlock, PageData } from "@/types/page.types";
import { imageFixture } from "./image.fixture";
import {
  buildCardGridBlock,
  buildFullLayout,
  buildHeroBlock,
  buildTextBlock,
} from "./blocks.fixture";

export const buildPageData = (overrides: Partial<PageData> = {}): PageData => ({
  id: "page-home",
  indexable: true,
  layout: buildFullLayout(),
  meta: {
    title: "Casa Maiz",
    image: imageFixture,
    description: "Cocina mexicana contemporanea.",
  },
  slug: "home",
  title: "Inicio",
  updatedAt: "2026-08-01T10:00:00.000Z",
  resolvedContext: {
    appVersion: "1.0.1",
    authenticationState: "guest",
    market: "MX",
    now: "2026-08-31T10:00:00.000Z",
    platform: "ios",
  },
  preview: false,
  nextChangeAt: "2099-01-01T00:00:00.000Z",
  ...overrides,
});

export const buildPageResponse = (
  overrides: Partial<PageData> = {},
): ApiResponse => ({
  contractVersion: "1.0.0",
  data: buildPageData(overrides),
});

export const buildEmptyPageResponse = (): ApiResponse =>
  buildPageResponse({ layout: [] as LayoutBlock[] });

export const homePageFixture: ApiResponse = buildPageResponse();

export const menuPageFixture: ApiResponse = buildPageResponse({
  id: "page-menu",
  slug: "menu",
  title: "Menu",
  layout: [buildHeroBlock(), buildCardGridBlock(), buildTextBlock()],
});

export const emptyPageFixture: ApiResponse = buildEmptyPageResponse();
