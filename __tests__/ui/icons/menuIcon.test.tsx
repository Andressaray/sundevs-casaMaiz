import React from 'react';
import { render } from '@testing-library/react-native';
import MenuIcon from '@/ui/icons/menuIcon';

describe('ui/icons / MenuIcon', () => {
  it('renderiza sin errors', () => {
    const { toJSON } = render(<MenuIcon />);
    expect(toJSON()).toBeDefined();
  });

  it('acepta props de tamaño personalizado', () => {
    const { toJSON } = render(<MenuIcon size={32} />);
    expect(toJSON()).toBeDefined();
  });
});
