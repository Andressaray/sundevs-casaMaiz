import React from 'react';
import { render, screen } from '@testing-library/react-native';
import CasaMaizLoadingScreen from '@/components/ui/Loading';
import es from '@/config/languages/es.json';

describe('components/ui / CasaMaizLoadingScreen', () => {
  it('renderiza sin errores', () => {
    const { toJSON } = render(<CasaMaizLoadingScreen />);

    expect(toJSON()).toBeTruthy();
  });

  it('muestra el copy de carga traducido', () => {
    render(<CasaMaizLoadingScreen />);

    expect(screen.getByText(es.loading.preparing)).toBeOnTheScreen();
  });
});
