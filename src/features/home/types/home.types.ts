import type { PageData } from "@/types/page.types";

export type {
  PageData,
  LayoutBlock,
  RestaurantHeroBlock,
  CardGridBlock,
  CarouselBlock,
  PromoRailBlock,
  TextBlock,
  RestaurantCTABlock,
  ImageBlock,
  Card,
  Slide,
  Promotion,
  Action,
  CTA,
  Destination,
  Image,
  ImageSize,
  ImageSizes,
  RichText,
  Meta,
  ResolvedContext,
  Channel,
  ExternalPromotion,
  ApiResponse,
} from "@/types/page.types";

export interface HomeState {
  pages: PageData[];
  error: Error | null;
  isLoading: boolean;
}
