import React, { useCallback } from "react";
import { FlatList, RefreshControl } from "react-native";

import { useNavigation } from "@react-navigation/native";

import { BlockRenderer } from "@/components/blocks";
import { ErrorFallback } from "@/components/ui/ErrorFallback";
import { ROUTES, type RoutePath, type RouteValue } from "@/navigation";
import { RootNavigationProp, navigateToRoute } from "@/navigation/types";
import { COLORS } from "@/theme/colors";
import Container from "@/ui/shared/container";

import { HomeEmpty, HomeSkeleton } from "../../components";
import useGetHomeData from "../../hooks/useHomeData";
import Loading from "@/ui/shared/loading";
import { AlertsContainer } from "@/components/ui";

const HomeScreen = (): React.ReactElement => {
  const navigation = useNavigation<RootNavigationProp>();
  const { data, isLoading, isError, error, refetch, isRefetching } =
    useGetHomeData();

  const handleRefresh = useCallback((): void => {
    refetch();
  }, [refetch]);

  const handleNavigation = useCallback(
    (path: string): void => {
      if (path in ROUTES) {
        const routePath = path as RoutePath;
        const route = ROUTES[routePath] as RouteValue;
        navigateToRoute(navigation, route);
      }
    },
    [navigation],
  );

  if (isError && !data) {
    return (
      <Container>
        <ErrorFallback
          error={error ?? undefined}
          titleKey="errors.general_error"
          messageKey="errors.load_restaurant_content"
          retryLabelKey="common.retry"
          onRetry={refetch}
          showDetails={false}
        />
      </Container>
    );
  }

  const layout = data?.data?.layout;

  return (
    <Container>
      <Loading
        isLoading={isLoading && !isRefetching}
        component={<HomeSkeleton />}
      >
        <FlatList
          data={layout}
          ListHeaderComponent={AlertsContainer}
          ListEmptyComponent={<HomeEmpty onRetry={handleRefresh} />}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefetching}
              onRefresh={handleRefresh}
              tintColor={COLORS.light.bgTertiary}
              progressViewOffset={10}
            />
          }
          renderItem={({ item }) => (
            <BlockRenderer block={item} onNavigate={handleNavigation} />
          )}
          keyExtractor={(item) => item.id}
        />
      </Loading>
    </Container>
  );
};

export default HomeScreen;
