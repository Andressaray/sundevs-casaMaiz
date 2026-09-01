import { useMemo } from "react";
import { useQuery, useQueryClient } from "react-query";

import type { ApiResponse, UsePageDataOptions } from "@/types/page.types";

interface Timing {
  staleTime: number;
  cacheTime: number;
}

// Node/browsers store timer delays in a 32-bit signed int; anything beyond
// this overflows and fires almost immediately instead of "never". Clamp any
// CMS-provided duration (e.g. a `nextChangeAt` far in the future) to this
// safe ceiling so react-query's GC/stale timers behave predictably.
const MAX_TIMEOUT_MS = 2_147_483_647;

const resolveTiming = (
  nextChangeAt: string | undefined,
  staleTime: number,
  cacheTime: number,
): Timing => {
  if (!nextChangeAt) {
    return { staleTime, cacheTime };
  }

  const nextChangeTime = new Date(nextChangeAt).getTime();

  if (Number.isNaN(nextChangeTime)) {
    return { staleTime, cacheTime };
  }

  const timeUntilChange = Math.min(
    MAX_TIMEOUT_MS,
    Math.max(0, nextChangeTime - Date.now()),
  );

  if (timeUntilChange === 0) {
    return { staleTime: 0, cacheTime: 0 };
  }

  return {
    staleTime: Math.min(staleTime, timeUntilChange),
    cacheTime: timeUntilChange,
  };
};

const usePageData = ({
  queryKey,
  fetchFn,
  staleTime = 1000 * 60 * 5,
  cacheTime = 1000 * 60 * 10,
  retry = 2,
  retryDelay = 1000,
}: UsePageDataOptions) => {
  const queryClient = useQueryClient();

  const cached = queryClient.getQueryData<ApiResponse>(queryKey);
  const nextChangeAt = cached?.data?.nextChangeAt;

  const timing = useMemo(
    () => resolveTiming(nextChangeAt, staleTime, cacheTime),
    [nextChangeAt, staleTime, cacheTime],
  );

  const query = useQuery<ApiResponse, Error>(queryKey, fetchFn, {
    staleTime: timing.staleTime,
    cacheTime: timing.cacheTime,
    retry,
    retryDelay,
    enabled: true,
    refetchOnMount: true,
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error as Error | null,
    refetch: query.refetch,
    isRefetching: query.isRefetching,
  };
};

export default usePageData;
