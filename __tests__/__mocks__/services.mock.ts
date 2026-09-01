import { homePageFixture, menuPageFixture } from "@tests/fixtures/page.fixture";
import { bootstrapFixture } from "@tests/fixtures/bootstrap.fixture";

export const mockGetHomeService = jest.fn(async () => homePageFixture);
export const mockGetMenuService = jest.fn(async () => menuPageFixture);
export const mockGetDataByPage = jest.fn(async () => homePageFixture);
export const mockGetBootstrapData = jest.fn(async () => bootstrapFixture);

export const homeServiceMockFactory = () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({
    baseUrl: "/pages/home",
    getHomeService: mockGetHomeService,
  })),
});

export const menuServiceMockFactory = () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({
    baseUrl: "/pages/menu",
    getMenuService: mockGetMenuService,
  })),
});

export const pagesServiceMockFactory = () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({
    baseUrl: "/pages",
    getDataByPage: mockGetDataByPage,
  })),
});

export const bootstrapServiceMockFactory = () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({
    baseUrl: "/bootstrap",
    getBootstrapData: mockGetBootstrapData,
  })),
});

export const resetServiceMocks = (): void => {
  mockGetHomeService.mockClear();
  mockGetMenuService.mockClear();
  mockGetDataByPage.mockClear();
  mockGetBootstrapData.mockClear();
};
