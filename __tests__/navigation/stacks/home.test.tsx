import React from 'react';
import { render } from '@testing-library/react-native';
import HomeStack, { HOME_STACK } from '@/navigation/stacks/home';

describe('navigation/stacks / HomeStack', () => {
  it('exporta HOME_STACK constante', () => {
    expect(HOME_STACK).toBe('HomeStack');
  });

  it('renderiza sin errors', () => {
    const { toJSON } = render(<HomeStack />);
    expect(toJSON()).toBeDefined();
  });
});
