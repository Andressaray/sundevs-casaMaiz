import React from "react";
import { View } from "react-native";

import { LayoutBlock } from "@/types/page.types";

import CardGrid from "./cardGrid";
import Carousel from "./carousel";
import Hero from "./hero";
import ImageBlock from "./imageBlock";
import PromoRail from "./promoRail";
import RestaurantCTA from "./restaurantCTA";
import TextBlock from "./textBlock";

interface BlockRendererProps {
  block: LayoutBlock;
  onNavigate: (_path: string) => void;
}

const BlockRenderer: React.FC<BlockRendererProps> = ({ block, onNavigate }) => {
  if (!block) {
    console.warn("BlockRenderer received null block");
    return <View />;
  }

  const { blockType } = block;
  switch (blockType) {
    case "restaurantHero":
      return <Hero block={block} onPress={onNavigate} />;
    case "textBlock":
      return <TextBlock block={block} />;
    case "imageBlock":
      return <ImageBlock block={block} />;
    case "carousel":
      return <Carousel block={block} />;
    case "cardGrid":
      return <CardGrid block={block} />;
    case "promoRail":
      return <PromoRail block={block} onPress={onNavigate} />;
    case "restaurantCTA":
      return <RestaurantCTA block={block} onPress={onNavigate} />;
    default:
      console.warn(`Unknown block type: ${blockType}`);
      return <View />;
  }
};

export default BlockRenderer;
