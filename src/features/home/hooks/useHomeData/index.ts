import { Platform } from "react-native";

import { APP_VERSION } from "@/config/constants";
import HomeService from "@/features/home/services";
import usePageData from "@/hooks/usePageData";

const homeService = new HomeService();

const useGetHomeData = () => {
  const platform = Platform.OS;

  const { data, isLoading, isError, error, refetch, isRefetching } =
    usePageData({
      queryKey: ["home"],
      fetchFn: () =>
        homeService.getHomeService({
          platform,
          market: "MX",
          audience: "guest",
          appVersion: APP_VERSION,
        }),
    });

  return {
    isLoading,
    data,
    isError,
    error,
    refetch,
    isRefetching,
  };
};

export default useGetHomeData;
