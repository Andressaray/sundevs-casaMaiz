import React, { useCallback } from "react";
import { RefreshControl, ScrollView } from "react-native";

import { COLORS } from "@/theme/colors";
import Container from "@/ui/shared/container";
import Loading from "@/ui/shared/loading";

import {
  PrivacyContent,
  PrivacyEmpty,
  PrivacyError,
  PrivacySkeleton,
} from "../../components";
import { usePrivacyData } from "../../hooks";

const PrivacyScreen = (): React.ReactElement => {
  const { data, isLoading, isRefetching, isError, error, refetch } =
    usePrivacyData();

  const handleRefresh = useCallback((): void => {
    refetch();
  }, [refetch]);

  if (isError && !data) {
    return (
      <Container>
        <PrivacyError error={error ?? undefined} onRetry={refetch} />
      </Container>
    );
  }

  return (
    <Container>
      <Loading
        isLoading={isLoading && !isRefetching}
        component={<PrivacySkeleton />}
      >
        {data?.data ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={isRefetching}
                onRefresh={handleRefresh}
                tintColor={COLORS.light.bgTertiary}
                progressViewOffset={10}
              />
            }
          >
            <PrivacyContent document={data.data} />
          </ScrollView>
        ) : (
          <PrivacyEmpty onRetry={handleRefresh} />
        )}
      </Loading>
    </Container>
  );
};

export default PrivacyScreen;
