import React from 'react';
import { render } from '@testing-library/react-native';
import PrivacyStack from '@/navigation/stacks/privacy';

describe('navigation/stacks / PrivacyStack', () => {
  it('renderiza sin errors', () => {
    const { toJSON } = render(<PrivacyStack />);
    expect(toJSON()).toBeDefined();
  });
});
