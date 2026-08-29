import Container from "@/ui/shared/container";
import React from "react";
import { ActivityIndicator, ScrollView, Text, View, RefreshControl } from "react-native";
import useMenuData from "../../hooks/useMenuData";
import { BlockRenderer } from "@/components/blocks";
import useTranslation from "@/hooks/useTranslation";

const MenuScreen = (): React.ReactElement => {
    const {t} = useTranslation()
    const {isError, isLoading, data, error, refetch, isRefetching } = useMenuData()
    
    const handleNavigation = (path: string) => {
        console.log('Navigate to:', path);
    };

    const handleRefresh = () => {
      console.log('🔄 Refetching menu data...');
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
}

export default MenuScreen
