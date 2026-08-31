import React from 'react';
import { render } from '@testing-library/react-native';
import MenuStack from '@/navigation/stacks/menu';

describe('navigation/stacks / MenuStack', () => {
  it('renderiza sin errors', () => {
    const { toJSON } = render(<MenuStack />);
    expect(toJSON()).toBeDefined();
  });
});
