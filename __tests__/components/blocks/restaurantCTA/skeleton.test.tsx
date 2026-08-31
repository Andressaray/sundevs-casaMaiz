import React from 'react';
import { render } from '@testing-library/react-native';
import RestaurantCTASkeleton from '@/components/blocks/restaurantCTA/skeleton';

describe('components/blocks/restaurantCTA / RestaurantCTASkeleton', () => {
  it('renderiza sin errors', () => {
    const { toJSON } = render(<RestaurantCTASkeleton />);
    expect(toJSON()).toBeDefined();
  });

  it('renderiza el contenedor principal', () => {
    const { root } = render(<RestaurantCTASkeleton />);
    expect(root).toBeDefined();
  });
});
