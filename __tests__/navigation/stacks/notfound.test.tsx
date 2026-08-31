import React from 'react';
import { render } from '@testing-library/react-native';
import NotFoundStack from '@/navigation/stacks/notfound';

describe('navigation/stacks / NotFoundStack', () => {
  it('renderiza sin errors', () => {
    const { toJSON } = render(<NotFoundStack />);
    expect(toJSON()).toBeDefined();
  });
});
