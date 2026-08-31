import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import AlertComponent from '@/components/ui/Alert';
import { alertFixture } from '@tests/fixtures/bootstrap.fixture';
import {
  mockNavigate,
  navigationMockFactory,
} from '@tests/__mocks__/navigation.mock';
import type { Alert } from '@/types/bootstrap.types';

jest.mock('@react-navigation/native', () =>
  require('@tests/__mocks__/navigation.mock').navigationMockFactory(),
);

void navigationMockFactory;

const buildAlert = (overrides: Partial<Alert> = {}) =>
  ({ ...alertFixture, ...overrides }) as unknown as Alert;

describe('components/ui / AlertComponent', () => {
  it('muestra titulo y mensaje del CMS', () => {
    render(<AlertComponent alert={buildAlert()} />);

    expect(screen.getByText('Horario especial')).toBeOnTheScreen();
    expect(
      screen.getByText('Este domingo cerramos a las 18:00.'),
    ).toBeOnTheScreen();
  });

  it('renderiza un boton por cada action', () => {
    render(<AlertComponent alert={buildAlert()} />);

    expect(screen.getByText('Ver mas')).toBeOnTheScreen();
  });

  it('navega a la ruta del action al pulsarlo', () => {
    render(<AlertComponent alert={buildAlert()} />);

    fireEvent.press(screen.getByText('Ver mas'));

    expect(mockNavigate).toHaveBeenCalledWith('menu');
  });

  it('muestra el boton de cerrar solo si es dismissible', () => {
    render(<AlertComponent alert={buildAlert({ dismissible: false })} />);

    expect(screen.queryByText('✕')).toBeNull();
  });

  it('no rompe cuando la alerta no trae imagen', () => {
    expect(() =>
      render(
        <AlertComponent alert={buildAlert({ image: undefined as never })} />,
      ),
    ).not.toThrow();
  });

  it('renderiza sin actions', () => {
    render(<AlertComponent alert={buildAlert({ actions: [] })} />);

    expect(screen.getByText('Horario especial')).toBeOnTheScreen();
    expect(screen.queryByText('Ver mas')).toBeNull();
  });
});
