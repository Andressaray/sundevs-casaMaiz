import type { Image, ImageSize } from '@/types/page.types';

const buildSize = (
  label: string,
  width: number,
  height: number,
): ImageSize => ({
  url: `https://cdn.casamaiz.test/media/${label}.webp`,
  width,
  height,
  mimeType: 'image/webp',
  filesize: width * height,
  filename: `${label}.webp`,
});

export const buildImageFixture = (overrides: Partial<Image> = {}): Image => ({
  createdAt: '2026-01-10T10:00:00.000Z',
  updatedAt: '2026-01-12T10:00:00.000Z',
  alt: 'Plato de la casa',
  usage: [],
  url: 'https://cdn.casamaiz.test/media/plato.webp',
  filename: 'plato.webp',
  mimeType: 'image/webp',
  filesize: 128_000,
  width: 1200,
  height: 800,
  focalX: 50,
  focalY: 50,
  sizes: {
    thumbnail: buildSize('plato-thumbnail', 300, 200),
    square: buildSize('plato-square', 500, 500),
    small: buildSize('plato-small', 600, 400),
    medium: buildSize('plato-medium', 900, 600),
    large: buildSize('plato-large', 1400, 900),
    xlarge: buildSize('plato-xlarge', 1920, 1280),
    og: buildSize('plato-og', 1200, 630),
  },
  id: 'media-1',
  thumbnailURL: 'https://cdn.casamaiz.test/media/plato-thumbnail.webp',
  ...overrides,
});

export const imageFixture = buildImageFixture();
