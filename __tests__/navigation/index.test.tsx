import React from 'react';
import { render } from '@testing-library/react-native';
import RootNavigation, { ROUTES } from '@/navigation';
import { HOME_STACK } from '@/navigation/stacks/home';
import { MENU_STACK } from '@/navigation/stacks/menu';
import { PRIVACY_STACK } from '@/navigation/stacks/privacy';
import { RESERVATION_STACK } from '@/navigation/stacks/reservation';
import { NOT_FOUND_STACK } from '@/navigation/stacks/notfound';
import { buildWrapper } from '@tests/utils';
import { mockBootstrapSuccess } from '@tests/__mocks__/handlers.mock';
import { restoreApiMock } from '@tests/__mocks__/api.mock';

jest.mock('@/hooks/useGetBootstrap', () =>
  require('@tests/__mocks__/bootstrap.mock').bootstrapHookMockFactory(),
);

describe('navigation / ROUTES', () => {
  afterAll(() => {
    restoreApiMock();
  });

  it('mapea cada path del CMS a un stack', () => {
    expect(ROUTES).toEqual({
      '/': HOME_STACK,
      '/menu': MENU_STACK,
      '/reservas': RESERVATION_STACK,
      '/legal/privacy_policy': PRIVACY_STACK,
      '/*': NOT_FOUND_STACK,
    });
  });

  it('define un fallback comodin hacia NotFound', () => {
    expect(ROUTES['/*']).toBe(NOT_FOUND_STACK);
  });

  it('todos los destinos son strings no vacios', () => {
    Object.values(ROUTES).forEach((stack) => {
      expect(typeof stack).toBe('string');
      expect(stack.length).toBeGreaterThan(0);
    });
  });

  it('un path desconocido no tiene entrada (debe caer en NOT_FOUND)', () => {
    expect(ROUTES['/no-existe' as keyof typeof ROUTES]).toBeUndefined();
  });

  it('monta el stack raiz sin errores', () => {
    mockBootstrapSuccess();

    const { toJSON } = render(<RootNavigation />, {
      wrapper: buildWrapper({ withNavigation: true }),
    });

    expect(toJSON()).toBeTruthy();
  });
});
