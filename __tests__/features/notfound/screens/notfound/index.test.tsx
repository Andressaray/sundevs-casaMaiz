import React from 'react';
import { fireEvent, screen } from '@testing-library/react-native';
import NotFoundScreen from '@features/notfound/screens/notfound';
import { renderWithProviders } from '@tests/utils';
import {
  mockCanGoBack,
  mockGoBack,
  mockReset,
} from '@tests/__mocks__/navigation.mock';
import es from '@/config/languages/es.json';

jest.mock('@react-navigation/native', () =>
  require('@tests/__mocks__/navigation.mock').navigationMockFactory(),
);

describe('features/notfound / NotFoundScreen', () => {
  it('muestra el 404 y los textos traducidos', () => {
    renderWithProviders(<NotFoundScreen />);

    expect(screen.getByText('404')).toBeOnTheScreen();
    expect(screen.getByText(es.page_not_found)).toBeOnTheScreen();
    expect(screen.getByText(es.page_not_found_description)).toBeOnTheScreen();
  });

  it('resetea la navegacion al pulsar "ir al inicio"', () => {
    renderWithProviders(<NotFoundScreen />);

    fireEvent.press(screen.getByText(es.common.go_home));

    expect(mockReset).toHaveBeenCalledWith({
      index: 0,
      routes: [{ name: 'Tabs', params: { screen: 'HomeStack' } }],
    });
  });

  it('vuelve atras si hay historial', () => {
    mockCanGoBack.mockReturnValue(true);
    renderWithProviders(<NotFoundScreen />);

    fireEvent.press(screen.getByText(es.common.go_back));

    expect(mockGoBack).toHaveBeenCalledTimes(1);
    expect(mockReset).not.toHaveBeenCalled();
  });

  it('cae al inicio si no hay historial', () => {
    mockCanGoBack.mockReturnValue(false);
    renderWithProviders(<NotFoundScreen />);

    fireEvent.press(screen.getByText(es.common.go_back));

    expect(mockGoBack).not.toHaveBeenCalled();
    expect(mockReset).toHaveBeenCalled();
  });
});
