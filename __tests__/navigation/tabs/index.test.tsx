import React from 'react';
import { render, screen, waitFor } from '@testing-library/react-native';
import TabsStack from '@/navigation/tabs';
import { buildWrapper } from '@tests/utils';
import {
  buildBootstrapContextValue,
  mockUseBootstrap,
} from '@tests/__mocks__/bootstrap.mock';
import {
  bootstrapOnlyHomeAndMenuFixture,
  buildBootstrap,
} from '@tests/fixtures/bootstrap.fixture';
import {
  mockHomeSuccess,
  mockMenuSuccess,
} from '@tests/__mocks__/handlers.mock';
import { restoreApiMock } from '@tests/__mocks__/api.mock';
import es from '@/config/languages/es.json';

jest.mock('@/hooks/useGetBootstrap', () =>
  require('@tests/__mocks__/bootstrap.mock').bootstrapHookMockFactory(),
);

jest.mock('@/navigation', () => ({
  __esModule: true,
  default: () => null,
  ROUTES: {},
}));

const renderTabs = () =>
  render(<TabsStack />, { wrapper: buildWrapper({ withNavigation: true }) });

describe('navigation/tabs', () => {
  beforeEach(() => {
    mockHomeSuccess();
    mockMenuSuccess();
    mockUseBootstrap.mockReturnValue(buildBootstrapContextValue());
  });

  afterAll(() => {
    restoreApiMock();
  });

  it('muestra una tab por cada item de navegacion del CMS', async () => {
    renderTabs();

    await waitFor(() => expect(screen.getByText(es.home)).toBeOnTheScreen());

    expect(screen.getByText(es.menu)).toBeOnTheScreen();
    expect(screen.getByText(es.reservations)).toBeOnTheScreen();
    expect(screen.getByText(es.privacy)).toBeOnTheScreen();
  });

  it('oculta las tabs que el CMS no habilita', async () => {
    mockUseBootstrap.mockReturnValue(
      buildBootstrapContextValue({ data: bootstrapOnlyHomeAndMenuFixture }),
    );

    renderTabs();

    await waitFor(() => expect(screen.getByText(es.home)).toBeOnTheScreen());

    expect(screen.getByText(es.menu)).toBeOnTheScreen();
    expect(screen.queryByText(es.reservations)).toBeNull();
    expect(screen.queryByText(es.privacy)).toBeNull();
  });

  it('[deuda] revienta cuando el CMS no devuelve items de navegacion', () => {
    mockUseBootstrap.mockReturnValue(
      buildBootstrapContextValue({
        data: buildBootstrap({
          navigation: { id: 'nav', key: 'main', name: 'Main', items: [] },
        } as never),
      }),
    );

    expect(() => renderTabs()).toThrow();
  });

  it('[deuda] revienta cuando aun no hay datos de bootstrap', () => {
    mockUseBootstrap.mockReturnValue(
      buildBootstrapContextValue({ data: undefined, isLoading: true }),
    );

    expect(() => renderTabs()).toThrow();
  });
});
