import AsyncStorage from "@react-native-async-storage/async-storage";
import type { QueryCache, Query } from "react-query";

const STORAGE_KEY = "@casamaiz/query-cache";
const MAX_AGE_MS = 1000 * 60 * 60 * 24 * 7;
const CRITICAL_PAGES: readonly string[] = ["bootstrap", "home", "menu"];

interface CachedQuery {
  data: unknown;
  dataUpdatedAt: number;
}

interface CacheData {
  critical: Record<string, CachedQuery>;
  timestamp: number;
}

interface RestoredQuery {
  queryKey: string[];
  data: unknown;
  dataUpdatedAt: number;
}

interface RestoreResult {
  queries: RestoredQuery[];
}

function validateCacheData(data: unknown): data is CacheData {
  if (typeof data !== "object" || data === null) {
    return false;
  }

  const candidate = data as Record<string, unknown>;

  return (
    typeof candidate.critical === "object" &&
    candidate.critical !== null &&
    typeof candidate.timestamp === "number"
  );
}

function isCachedQuery(value: unknown): value is CachedQuery {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return (
    candidate.data !== undefined && typeof candidate.dataUpdatedAt === "number"
  );
}

function extractQueryKey(queryKey: unknown): string {
  if (Array.isArray(queryKey)) {
    return String(queryKey[0]);
  }
  return String(queryKey);
}
class CachePersister {
  async persistClient(queryCache: QueryCache): Promise<void> {
    try {
      const timestamp = Date.now();

      const dataToCache: CacheData = {
        critical: {},
        timestamp,
      };

      const cachedQueries: Query[] = queryCache.getAll();

      cachedQueries.forEach((query: Query): void => {
        const queryKey: string = extractQueryKey(query.queryKey);

        if (
          CRITICAL_PAGES.includes(queryKey) &&
          query.state?.data !== undefined
        ) {
          dataToCache.critical[queryKey] = {
            data: query.state.data,
            dataUpdatedAt: query.state.dataUpdatedAt || timestamp,
          };
        }
      });

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(dataToCache));
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error(String(err));
      console.error("❌ Cache persist error:", error.message);
    }
  }

  async restoreClient(): Promise<RestoreResult | undefined> {
    try {
      const raw: string | null = await AsyncStorage.getItem(STORAGE_KEY);

      if (raw === null) {
        return undefined;
      }

      const parsedData: unknown = JSON.parse(raw);

      if (!validateCacheData(parsedData)) {
        throw new Error("Invalid cached data format");
      }

      const isExpired: boolean = Date.now() - parsedData.timestamp > MAX_AGE_MS;

      if (isExpired) {
        await this.removeClient();
        return undefined;
      }

      const queries: RestoredQuery[] = Object.entries(parsedData.critical)
        .filter(([, value]: [string, unknown]) => isCachedQuery(value))
        .map(([key, value]: [string, CachedQuery]) => ({
          queryKey: [key],
          data: value.data,
          dataUpdatedAt: value.dataUpdatedAt,
        }));

      return { queries };
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error(String(err));
      console.error("❌ Cache restore error:", error.message);
      return undefined;
    }
  }

  async removeClient(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error(String(err));
      console.error("❌ Cache remove error:", error.message);
    }
  }
}

export const cachePersister = new CachePersister();

export type { RestoredQuery, RestoreResult };
