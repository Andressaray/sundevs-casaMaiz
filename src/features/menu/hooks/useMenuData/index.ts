import { Platform } from "react-native";

import { APP_VERSION } from "@config/constants";

import MenuService from "@/features/menu/services";
import usePageData from "@/hooks/usePageData";

const menuService = new MenuService();

const useMenuData = () => {
  const platform = Platform.OS;

  const { data, isLoading, isError, error, refetch, isRefetching } =
    usePageData({
      queryKey: ["menu"],
      fetchFn: () =>
        menuService.getMenuService({
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

export default useMenuData;
