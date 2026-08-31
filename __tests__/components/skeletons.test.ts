import {
  HeroSkeleton,
  CardGridSkeleton,
  PromoRailSkeleton,
  TextBlockSkeleton,
  RestaurantCTASkeleton,
} from '@/components/skeletons';

describe('components / skeletons', () => {
  it('exporta HeroSkeleton', () => {
    expect(HeroSkeleton).toBeDefined();
  });

  it('exporta CardGridSkeleton', () => {
    expect(CardGridSkeleton).toBeDefined();
  });

  it('exporta PromoRailSkeleton', () => {
    expect(PromoRailSkeleton).toBeDefined();
  });

  it('exporta TextBlockSkeleton', () => {
    expect(TextBlockSkeleton).toBeDefined();
  });

  it('exporta RestaurantCTASkeleton', () => {
    expect(RestaurantCTASkeleton).toBeDefined();
  });
});
