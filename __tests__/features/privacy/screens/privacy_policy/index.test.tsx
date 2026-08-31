import React from 'react';
import { act, screen } from '@testing-library/react-native';
import PrivacyScreen from '@features/privacy/screens/privacy_policy';
import { renderWithProviders } from '@tests/utils';

jest.mock('@react-navigation/native', () =>
  require('@tests/__mocks__/navigation.mock').navigationMockFactory(),
);

jest.mock('@/navigation', () => ({
  __esModule: true,
  default: () => null,
  ROUTES: { '/legal/privacy_policy': 'LegalStack' },
}));

describe('features/privacy / PrivacyScreen', () => {
  it('muestra el estado vacio (la pantalla aun no consume el CMS)', () => {
    renderWithProviders(<PrivacyScreen />);

    expect(screen.getByTestId('empty-component')).toBeOnTheScreen();
  });

  it('el pull-to-refresh simula una recarga y vuelve a reposo', () => {
    jest.useFakeTimers();
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});

    renderWithProviders(<PrivacyScreen />);

    const list = screen.UNSAFE_getByType(
      require('react-native').FlatList as never,
    );

    act(() => {
      list.props.refreshControl.props.onRefresh();
    });

    expect(warn).toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    jest.useRealTimers();
  });

  it('[deuda] no consume /legal/privacy_policy todavia', () => {
    renderWithProviders(<PrivacyScreen />);

    // El contenido es estado local vacio, no hay peticion al CMS.
    expect(screen.queryByText('Bienvenido a Casa Maiz')).toBeNull();
  });
});
