import React from 'react';
import { render } from '@testing-library/react-native';
import ReservationStack from '@/navigation/stacks/reservation';

describe('navigation/stacks / ReservationStack', () => {
  it('renderiza sin errors', () => {
    const { toJSON } = render(<ReservationStack />);
    expect(toJSON()).toBeDefined();
  });
});
