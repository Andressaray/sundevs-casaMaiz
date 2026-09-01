import { QueryClient } from "react-query";

const mockStorage = new Map<string, string>();

jest.mock("@react-native-async-storage/async-storage", () => ({
  __esModule: true,
  default: {
    getItem: jest.fn(async (key: string) => mockStorage.get(key) ?? null),
    setItem: jest.fn(async (key: string, value: string) => {
      mockStorage.set(key, value);
    }),
    removeItem: jest.fn(async (key: string) => {
      mockStorage.delete(key);
    }),
  },
}));

import { cachePersister } from "@/services/cache/persister";
import { buildPageResponse } from "@tests/fixtures/page.fixture";

const hydrate = async (client: QueryClient) => {
  const restored = await cachePersister.restoreClient();

  restored?.queries.forEach(({ queryKey, data, dataUpdatedAt }) => {
    client.setQueryData(queryKey, data, { updatedAt: dataUpdatedAt });
  });

  return restored;
};

describe("services/cache / cachePersister", () => {
  beforeEach(() => {
    mockStorage.clear();
  });

  it("persiste solo las paginas criticas", async () => {
    const client = new QueryClient();
    client.setQueryData(["menu"], buildPageResponse({ slug: "menu" }));
    client.setQueryData(["reservations"], buildPageResponse());

    await cachePersister.persistClient(client.getQueryCache());
    const restored = await cachePersister.restoreClient();

    expect(restored?.queries.map((q) => q.queryKey[0])).toEqual(["menu"]);
  });

  it("restaura el ApiResponse tal cual, sin el envoltorio del storage", async () => {
    const response = buildPageResponse({ slug: "menu" });
    const source = new QueryClient();
    source.setQueryData(["menu"], response);
    await cachePersister.persistClient(source.getQueryCache());

    const client = new QueryClient();
    await hydrate(client);

    const cached = client.getQueryData(["menu"]);

    expect(cached).toEqual(response);
    expect((cached as typeof response).data.layout).toBeDefined();
  });

  it("conserva la edad real del dato para que quede stale y se refetchee", async () => {
    const hoursAgo = Date.now() - 1000 * 60 * 60 * 3;
    const source = new QueryClient();
    source.setQueryData(["menu"], buildPageResponse({ slug: "menu" }), {
      updatedAt: hoursAgo,
    });
    await cachePersister.persistClient(source.getQueryCache());

    const client = new QueryClient();
    await hydrate(client);

    const query = client.getQueryCache().find(["menu"]);

    expect(query?.state.dataUpdatedAt).toBe(hoursAgo);
    expect(query?.isStaleByTime(1000 * 60 * 5)).toBe(true);
  });

  it("descarta entradas con forma invalida", async () => {
    mockStorage.set(
      "@casamaiz/query-cache",
      JSON.stringify({
        critical: { menu: { foo: "bar" } },
        timestamp: Date.now(),
      }),
    );

    const restored = await cachePersister.restoreClient();

    expect(restored?.queries).toEqual([]);
  });

  it("ignora un cache expirado", async () => {
    mockStorage.set(
      "@casamaiz/query-cache",
      JSON.stringify({
        critical: { menu: { data: {}, dataUpdatedAt: 1 } },
        timestamp: Date.now() - 1000 * 60 * 60 * 24 * 8,
      }),
    );

    await expect(cachePersister.restoreClient()).resolves.toBeUndefined();
    expect(mockStorage.has("@casamaiz/query-cache")).toBe(false);
  });
});
