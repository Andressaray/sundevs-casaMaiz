import React from 'react';
import {
  Text,
  ScrollView,
  ActivityIndicator,
  View,
  RefreshControl,
} from 'react-native';
import useGetHomeData from '../../hooks/useHomeData';
import useTranslation from '@/hooks/useTranslation';
import Container from '@/ui/shared/container';
import { BlockRenderer } from '@/components/blocks';

const HomeScreen = (): React.ReactElement => {
  const { t } = useTranslation();
  const { data, isLoading, isError, error, refetch, isRefetching } = useGetHomeData();

  console.log('🏠 HomeScreen - data:', data);
  console.log('🏠 HomeScreen - isLoading:', isLoading);
  console.log('🏠 HomeScreen - isError:', isError);

  const handleNavigation = (path: string) => {
    console.log('Navigate to:', path);
  };

  const handleRefresh = () => {
    console.log('🔄 Refetching home data...');
    refetch();
  };

  if (isLoading && !isRefetching) {
    return (
      <Container>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container>
        <Text>Error: {error?.message || t('error')}</Text>
      </Container>
    );
  }

  const layout = data?.data?.layout;

  if (!layout || layout.length === 0) {
    return (
      <Container>
        <Text>No layout blocks found</Text>
      </Container>
    );
  }

  return (
    <ScrollView 
      style={{ flex: 1 }}
      refreshControl={
        <RefreshControl
          refreshing={isRefetching}
          onRefresh={handleRefresh}
          tintColor="#A85C2C"
          progressViewOffset={10}
        />
      }
    >
      <Container>
        {layout.map((block, index) => {
          console.log(`🔄 Rendering block ${index}:`, block.blockType);
          return (
            <BlockRenderer
              key={block.id || `block-${index}`}
              block={block}
              onNavigate={handleNavigation}
            />
          );
        })}
      </Container>
    </ScrollView>
  );
};

export default HomeScreen;
