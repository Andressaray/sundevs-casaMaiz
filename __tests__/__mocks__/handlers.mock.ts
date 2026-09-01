import type MockAdapter from "axios-mock-adapter";
import { getApiMock } from "./api.mock";
import { bootstrapFixture } from "@tests/fixtures/bootstrap.fixture";
import { homePageFixture, menuPageFixture } from "@tests/fixtures/page.fixture";
import { privacyDocumentFixture } from "@tests/fixtures/privacy.fixture";

export const ENDPOINTS = {
  bootstrap: "/bootstrap",
  home: "/pages/home",
  menu: "/pages/menu",
  page: (slug: string) => `/pages/${slug}`,
  privacy: "/legal/privacy_policy",
} as const;

export const mockGetSuccess = (
  url: string,
  body: unknown,
  status = 200,
): MockAdapter => getApiMock().onGet(url).reply(status, body);

export const mockGetError = (
  url: string,
  status = 500,
  body: { error?: string; errors?: unknown[] } = {
    error: "Internal Server Error",
    errors: [],
  },
): MockAdapter => getApiMock().onGet(url).reply(status, body);

export const mockNetworkError = (url: string): MockAdapter =>
  getApiMock().onGet(url).networkError();

export const mockTimeout = (url: string): MockAdapter =>
  getApiMock().onGet(url).timeout();

export const mockBootstrapSuccess = (body = bootstrapFixture): MockAdapter =>
  mockGetSuccess(ENDPOINTS.bootstrap, body);

export const mockBootstrapError = (status = 500): MockAdapter =>
  mockGetError(ENDPOINTS.bootstrap, status);

export const mockHomeSuccess = (body = homePageFixture): MockAdapter =>
  mockGetSuccess(ENDPOINTS.home, body);

export const mockMenuSuccess = (body = menuPageFixture): MockAdapter =>
  mockGetSuccess(ENDPOINTS.menu, body);

export const mockPrivacySuccess = (
  body: unknown = privacyDocumentFixture,
): MockAdapter => mockGetSuccess(ENDPOINTS.privacy, body);

export const mockPrivacyError = (status = 500): MockAdapter =>
  mockGetError(ENDPOINTS.privacy, status);

export const mockAllSuccess = (): void => {
  mockBootstrapSuccess();
  mockHomeSuccess();
  mockMenuSuccess();
  mockPrivacySuccess();
};
