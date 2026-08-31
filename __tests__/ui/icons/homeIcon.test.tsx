import React from 'react';
import { render } from '@testing-library/react-native';
import HomeIcon from '@/ui/icons/homeIcon';

describe('ui/icons / HomeIcon', () => {
  it('renderiza sin errors', () => {
    const { toJSON } = render(<HomeIcon />);
    expect(toJSON()).toBeDefined();
  });

  it('acepta props de tamaño personalizado', () => {
    const { toJSON } = render(<HomeIcon size={32} />);
    expect(toJSON()).toBeDefined();
  });
});
