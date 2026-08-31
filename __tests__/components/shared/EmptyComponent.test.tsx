import React from 'react';
import { render } from '@testing-library/react-native';
import EmptyComponent from '@/components/shared/EmptyComponent';

describe('components/shared / EmptyComponent', () => {
  it('renderiza sin errors', () => {
    const { toJSON } = render(<EmptyComponent />);
    expect(toJSON()).toBeDefined();
  });
});
