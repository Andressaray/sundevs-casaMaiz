import React from "react";
import { FlatList } from "react-native";

import Container from "@/ui/shared/container";

import {
  CardGridSkeleton,
  HeroSkeleton,
  PromoRailSkeleton,
  RestaurantCTASkeleton,
  TextBlockSkeleton,
} from "@/components/blocks/skeletons";

interface SkeletonItem {
  id: string;
  type: "hero" | "cardGrid" | "promoRail" | "textBlock" | "restaurantCTA";
}

const SKELETON_ITEMS: SkeletonItem[] = [
  { id: "1", type: "hero" },
  { id: "2", type: "cardGrid" },
  { id: "3", type: "cardGrid" },
  { id: "4", type: "textBlock" },
];

const MenuSkeleton = (): React.ReactElement => {
  const renderSkeletonItem = (item: SkeletonItem) => {
    switch (item.type) {
      case "hero":
        return <HeroSkeleton />;
      case "cardGrid":
        return <CardGridSkeleton cardCount={3} />;
      case "promoRail":
        return <PromoRailSkeleton promoCount={2} />;
      case "textBlock":
        return <TextBlockSkeleton />;
      case "restaurantCTA":
        return <RestaurantCTASkeleton />;
      default:
        return null;
    }
  };

  return (
    <Container>
      <FlatList
        data={SKELETON_ITEMS}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        renderItem={({ item }) => renderSkeletonItem(item)}
        keyExtractor={(item) => item.id}
      />
    </Container>
  );
};

export default MenuSkeleton;
