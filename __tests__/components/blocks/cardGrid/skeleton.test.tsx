import React from 'react';
import { render } from '@testing-library/react-native';
import CardGridSkeleton from '@/components/blocks/cardGrid/skeleton';

describe('components/blocks/cardGrid / CardGridSkeleton', () => {
  it('renderiza sin errors', () => {
    const { toJSON } = render(<CardGridSkeleton />);
    expect(toJSON()).toBeDefined();
  });

  it('renderiza el contenedor principal', () => {
    const { root } = render(<CardGridSkeleton />);
    expect(root).toBeDefined();
  });
});
