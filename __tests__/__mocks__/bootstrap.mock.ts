import { bootstrapFixture } from "@tests/fixtures/bootstrap.fixture";
import type { Bootstrap } from "@/types/bootstrap.types";

export const mockBootstrapRefetch = jest.fn(async () => bootstrapFixture);

export const buildBootstrapContextValue = (
  overrides: Partial<{
    data: Bootstrap | undefined;
    isLoading: boolean;
    isError: boolean;
    error: Error | null;
  }> = {},
) => ({
  query: { data: bootstrapFixture } as never,
  data: bootstrapFixture as Bootstrap | undefined,
  isLoading: false,
  isError: false,
  error: null as Error | null,
  refetch: mockBootstrapRefetch,
  ...overrides,
});

export const mockUseBootstrap = jest.fn(() => buildBootstrapContextValue());

export const bootstrapHookMockFactory = () => ({
  __esModule: true,
  default: mockUseBootstrap,
});
