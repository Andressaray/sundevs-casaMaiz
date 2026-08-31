import React from 'react';
import { act, screen } from '@testing-library/react-native';
import ReservationsScreen from '@features/reservation/screens/reservations';
import { renderWithProviders } from '@tests/utils';

describe('features/reservation / ReservationsScreen', () => {
  it('muestra el estado vacio de reservas', () => {
    renderWithProviders(<ReservationsScreen />);

    expect(screen.getByTestId('empty-component')).toBeOnTheScreen();
    expect(screen.getByTestId('empty-component-action')).toBeOnTheScreen();
  });

  it('el pull-to-refresh esta conectado', () => {
    jest.useFakeTimers();
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});

    renderWithProviders(<ReservationsScreen />);

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

  it('[deuda] usa datos locales, no el CMS', () => {
    renderWithProviders(<ReservationsScreen />);

    const list = screen.UNSAFE_getByType(
      require('react-native').FlatList as never,
    );

    expect(list.props.data).toEqual([]);
  });
});
