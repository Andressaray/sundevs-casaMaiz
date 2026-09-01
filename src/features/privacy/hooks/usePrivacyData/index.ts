import { Platform } from "react-native";

import { APP_VERSION } from "@/config/constants";

import PrivacyService from "@/features/privacy/services";
import { useQuery } from "react-query";
import { LegalDocument } from "../../types/privacy.types";

const privacyService = new PrivacyService();

const usePrivacyData = () => {
  const platform = Platform.OS;

  const { data, isError, isRefetching, isLoading, error, refetch } = useQuery<
    LegalDocument,
    Error
  >({
    queryKey: ["privacy"],
    queryFn: async () => {
      return await privacyService.getPrivacyService({
        platform,
        market: "MX",
        audience: "guest",
        appVersion: APP_VERSION,
      });
    },
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

export default usePrivacyData;
