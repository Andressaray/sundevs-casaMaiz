import React from 'react';
import { render } from '@testing-library/react-native';
import Example from '@/components/example';

describe('components / Example', () => {
  it('renderiza sin errors', () => {
    const { toJSON } = render(<Example />);
    expect(toJSON()).toBeDefined();
  });

  it('renderiza el contenedor principal', () => {
    const { root } = render(<Example />);
    expect(root).toBeDefined();
  });
});
