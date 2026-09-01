import React, { useCallback } from "react";
import { FlatList, RefreshControl } from "react-native";

import { useNavigation } from "@react-navigation/native";

import { BlockRenderer } from "@/components/blocks";
import { ErrorFallback } from "@/components/ui/ErrorFallback";
import { ROUTES, type RoutePath, type RouteValue } from "@/navigation";
import { RootNavigationProp, navigateToRoute } from "@/navigation/types";
import { COLORS } from "@/theme/colors";
import Container from "@/ui/shared/container";
import Loading from "@/ui/shared/loading";

import { MenuEmpty, MenuSkeleton } from "../../components";
import useMenuData from "../../hooks/useMenuData";

const MenuScreen = (): React.ReactElement => {
  const { isError, isLoading, data, error, refetch, isRefetching } =
    useMenuData();
  const navigation = useNavigation<RootNavigationProp>();

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

  const handleRefresh = useCallback((): void => {
    refetch();
  }, [refetch]);

  if (isError && !data) {
    return (
      <Container>
        <ErrorFallback
          error={error ?? undefined}
          titleKey="errors.general_error"
          messageKey="errors.load_menu_error"
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
        component={<MenuSkeleton />}
      >
        <FlatList
          data={layout}
          ListEmptyComponent={<MenuEmpty onRetry={handleRefresh} />}
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

export default MenuScreen;
