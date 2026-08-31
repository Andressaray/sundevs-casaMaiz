import type {
  CardGridBlock,
  CarouselBlock,
  Destination,
  ImageBlock,
  LayoutBlock,
  PromoRailBlock,
  RestaurantCTABlock,
  RestaurantHeroBlock,
  TextBlock,
} from '@/types/page.types';
import { buildImageFixture, imageFixture } from './image.fixture';

export const destinationFixture: Destination = {
  key: 'menu',
  label: 'Menu',
  path: '/menu',
  supportedPlatforms: ['ios', 'android', 'web'],
};

export const buildHeroBlock = (
  overrides: Partial<RestaurantHeroBlock> = {},
): RestaurantHeroBlock => ({
  blockType: 'restaurantHero',
  channels: ['ios', 'android'],
  eyebrow: 'Cocina de maiz',
  headline: 'Bienvenido a Casa Maiz',
  description: 'Sabores tradicionales con producto de temporada.',
  image: imageFixture,
  actions: [
    { label: 'Ver menu', destination: destinationFixture, href: '/menu' },
    {
      label: 'Reservar',
      destination: {
        ...destinationFixture,
        key: 'reservations',
        path: '/reservas',
      },
      href: '/reservas',
    },
  ],
  id: 'block-hero-1',
  blockName: 'Hero principal',
  contractVersion: '1.0.0',
  ...overrides,
});

export const buildCardGridBlock = (
  overrides: Partial<CardGridBlock> = {},
): CardGridBlock => ({
  blockType: 'cardGrid',
  channels: ['ios', 'android'],
  eyebrow: 'Nuestra carta',
  title: 'Platos destacados',
  cards: [
    {
      id: 'card-1',
      image: imageFixture,
      title: 'Tlayuda',
      description: 'Tortilla de maiz azul con asiento y quesillo.',
      price: '$180',
    },
    {
      id: 'card-2',
      image: buildImageFixture({ id: 'media-2', alt: 'Mole' }),
      title: 'Mole negro',
      description: 'Receta oaxaquena con 32 ingredientes.',
      price: '$240',
    },
  ],
  id: 'block-cardgrid-1',
  contractVersion: '1.0.0',
  ...overrides,
});

export const buildCarouselBlock = (
  overrides: Partial<CarouselBlock> = {},
): CarouselBlock => ({
  blockType: 'carousel',
  channels: ['ios', 'android'],
  title: 'El restaurante',
  slides: [
    {
      id: 'slide-1',
      image: imageFixture,
      title: 'La barra',
      description: 'Mezcales seleccionados por la casa.',
    },
    {
      id: 'slide-2',
      image: buildImageFixture({ id: 'media-3' }),
      title: 'El comedor',
      description: 'Capacidad para 60 comensales.',
    },
  ],
  id: 'block-carousel-1',
  contractVersion: '1.0.0',
  ...overrides,
});

export const buildPromoRailBlock = (
  overrides: Partial<PromoRailBlock> = {},
): PromoRailBlock => ({
  blockType: 'promoRail',
  channels: ['ios', 'android'],
  title: 'Promociones',
  promotions: [
    {
      id: 'promo-1',
      title: '2x1 en entradas',
      eyebrow: 'Solo martes',
      description: 'Valido de 13:00 a 17:00.',
      desktopImage: imageFixture,
      mobileImage: imageFixture,
      placement: 'home',
      priority: 1,
      emoji: 'sparkles',

      cta: {
        label: 'Ver condiciones',
        destination: destinationFixture,
        href: '/menu',
      } as unknown as PromoRailBlock['promotions'][number]['cta'],
      externalPromotion: {
        provider: 'internal',
        campaignId: 'camp-1',
        trackingCode: 'TRK-1',
      },
    },
  ],
  id: 'block-promorail-1',
  contractVersion: '1.0.0',
  ...overrides,
});

export const buildTextBlock = (
  overrides: Partial<TextBlock> = {},
): TextBlock => ({
  blockType: 'textBlock',
  channels: ['ios', 'android'],
  eyebrow: 'Nuestra historia',
  heading: 'Del comal a la mesa',
  body: 'Nixtamalizamos nuestro maiz cada manana.',
  alignment: 'center',
  id: 'block-text-1',
  contractVersion: '1.0.0',
  ...overrides,
});

export const buildRestaurantCTABlock = (
  overrides: Partial<RestaurantCTABlock> = {},
): RestaurantCTABlock => ({
  blockType: 'restaurantCTA',
  channels: ['ios', 'android'],
  headline: 'Reserva tu mesa',
  description: 'Disponibilidad limitada los fines de semana.',
  label: 'Reservar ahora',
  destination: {
    ...destinationFixture,
    key: 'reservations',
    path: '/reservas',
  },
  href: '/reservas',
  tone: 'primary',
  id: 'block-cta-1',
  contractVersion: '1.0.0',
  ...overrides,
});

export const buildImageBlock = (
  overrides: Partial<ImageBlock> = {},
): ImageBlock => ({
  blockType: 'imageBlock',
  channels: ['ios', 'android'],
  image: imageFixture,
  mobileImage: buildImageFixture({
    id: 'media-mobile',
    width: 800,
    height: 800,
  }),
  caption: 'Nuestro comal de barro',
  fullBleed: false,
  id: 'block-image-1',
  contractVersion: '1.0.0',
  ...overrides,
});

export const unknownBlockFixture = {
  blockType: 'formBlock',
  channels: ['ios'],
  id: 'block-unknown-1',
  contractVersion: '1.0.0',
} as unknown as LayoutBlock;

export const buildFullLayout = (): LayoutBlock[] => [
  buildHeroBlock(),
  buildCardGridBlock(),
  buildCarouselBlock(),
  buildPromoRailBlock(),
  buildTextBlock(),
  buildRestaurantCTABlock(),
  buildImageBlock(),
];
