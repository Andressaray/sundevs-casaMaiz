interface ImageSize {
  url: string;
  width: number;
  height: number;
  mimeType: string;
  filesize: number;
  filename: string;
}

interface ImageSizes {
  thumbnail?: ImageSize;
  square?: ImageSize;
  small?: ImageSize;
  medium?: ImageSize;
  large?: ImageSize;
  xlarge?: ImageSize;
  og?: ImageSize;
}

interface RichText {
  root: {
    type: string;
    children: Array<{
      type: string;
      children?: Array<
        | {
            type: string;
            detail: number;
            format: number;
            mode: string;
            style: string;
            text: string;
            version: number;
          }
        | {
            type: string;
            children: Array<{
              type: string;
              detail: number;
              format: number;
              mode: string;
              style: string;
              text: string;
              version: number;
            }>;
            direction: string;
            fields: {
              linkType: string;
              newTab: boolean;
              url: string;
            };
            format: string;
            indent: number;
            version: number;
          }
      >;
      direction?: string;
      format?: string;
      indent?: number;
      textFormat?: number;
      version: number;
    }>;
    direction: string;
    format: string;
    indent: number;
    version: number;
  };
}

interface Image {
  createdAt: string;
  updatedAt: string;
  alt: string;
  caption?: RichText;
  usage: Record<string, unknown>[];
  url: string;
  filename: string;
  mimeType: string;
  filesize: number;
  width: number;
  height: number;
  focalX: number;
  focalY: number;
  sizes: ImageSizes;
  id: string;
  thumbnailURL: string;
}

interface Destination {
  key: string;
  label: string;
  path: string;
  supportedPlatforms: string[];
}

interface Action {
  label: string;
  destination: Destination;
  href: string;
}

interface CTA {
  label: string;
  destination: Destination;
  onPress: () => void;
  href?: string;
}

type Channel = "web" | "ios" | "android";

interface RestaurantHeroBlock {
  blockType: "restaurantHero";
  channels: Channel[];
  eyebrow: string;
  headline: string;
  description: string;
  image: Image;
  actions: Action[];
  id: string;
  blockName: string;
  contractVersion: string;
}

interface Card {
  image: Image;
  title: string;
  description: string;
  price: string;
  id: string;
}

interface CardGridBlock {
  blockType: "cardGrid";
  channels: Channel[];
  eyebrow: string;
  title: string;
  cards: Card[];
  id: string;
  contractVersion: string;
}

interface Slide {
  image: Image;
  title: string;
  description: string;
  id: string;
}

interface CarouselBlock {
  blockType: "carousel";
  channels: Channel[];
  title: string;
  slides: Slide[];
  id: string;
  contractVersion: string;
}

interface ExternalPromotion {
  provider: string;
  campaignId: string;
  trackingCode?: string;
}

interface Promotion {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  desktopImage: Image;
  mobileImage: Image;
  placement: string;
  priority: number;
  emoji: string;
  cta: CTA;
  externalPromotion: ExternalPromotion;
}

interface PromoRailBlock {
  blockType: "promoRail";
  channels: Channel[];
  title: string;
  promotions: Promotion[];
  id: string;
  contractVersion: string;
}

interface TextBlock {
  blockType: "textBlock";
  channels: Channel[];
  eyebrow?: string;
  heading: string;
  body: string;
  alignment: "left" | "center" | "right" | undefined;
  id: string;
  contractVersion: string;
}

interface RestaurantCTABlock {
  blockType: "restaurantCTA";
  channels: Channel[];
  headline: string;
  description: string;
  label: string;
  destination: Destination;
  href: string;
  tone: string;
  id: string;
  contractVersion: string;
}

interface ImageBlock {
  blockType: "imageBlock";
  channels: Channel[];
  image: Image;
  mobileImage?: Image;
  caption?: string;
  fullBleed?: boolean;
  id: string;
  contractVersion: string;
}

type LayoutBlock =
  | RestaurantHeroBlock
  | CardGridBlock
  | CarouselBlock
  | PromoRailBlock
  | TextBlock
  | RestaurantCTABlock
  | ImageBlock;

interface Meta {
  title: string;
  image: Image;
  description: string;
}

interface ResolvedContext {
  appVersion: string;
  authenticationState: string;
  market: string;
  now: string;
  platform: "web" | "ios" | "android";
}

interface PageData {
  id: string;
  indexable: boolean;
  layout: LayoutBlock[];
  meta: Meta;
  slug: string;
  title: string;
  updatedAt: string;
  resolvedContext: ResolvedContext;
  preview: boolean;
  nextChangeAt: string;
}

interface ApiResponse {
  contractVersion: string;
  data: PageData;
}

export type {
  ApiResponse,
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
};

export interface UsePageDataOptions {
  queryKey: string[] | readonly unknown[];
  fetchFn: () => Promise<ApiResponse>;
  staleTime?: number;
  cacheTime?: number;
  retry?: number;
  retryDelay?: number;
}
