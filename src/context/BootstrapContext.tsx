import React, { createContext, ReactNode } from "react";
import { Platform } from "react-native";
import { useQuery, UseQueryResult } from "react-query";

import CasaMaizLoadingScreen from "@/components/ui/Loading";
import { APP_VERSION } from "@/config/constants";
import BootstrapService from "@/services/bootstrap/bootstrap.service";
import { Bootstrap } from "@/types/bootstrap.types";

const bootstrapService = new BootstrapService();
export interface BootstrapContextType {
  query: UseQueryResult<Bootstrap, Error>;
  data: Bootstrap | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => Promise<UseQueryResult<Bootstrap, Error>>;
}
const BootstrapContext = createContext<BootstrapContextType | undefined>(
  undefined,
);
interface BootstrapProviderProps {
  children: ReactNode;
  slug?: string;
}
export const BootstrapProvider: React.FC<BootstrapProviderProps> = ({
  children,
}) => {
  const platform = Platform.OS;
  const query = useQuery<Bootstrap, Error>(
    ["bootstrap"],
    () =>
      bootstrapService.getBootstrapData({
        platform,
        market: "MX",
        audience: "guest",
        appVersion: APP_VERSION,
      }),
    {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 10,
      retry: 2,
      retryDelay: 1000,
    },
  );
  const value: BootstrapContextType = {
    query,
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
  if (query.isLoading) {
    return <CasaMaizLoadingScreen />;
  }

  return (
    <BootstrapContext.Provider value={value}>
      {children}
    </BootstrapContext.Provider>
  );
};
export default BootstrapContext;
