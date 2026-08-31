import React from 'react';
import { render, screen, waitFor } from '@testing-library/react-native';
import App from '../App';
import { restoreApiMock } from '@tests/__mocks__/api.mock';
import {
  _mockBootstrapError,
  mockBootstrapSuccess,
  mockHomeSuccess,
  mockMenuSuccess,
} from '@tests/__mocks__/handlers.mock';
import es from '@/config/languages/es.json';

describe('App', () => {
  afterAll(() => {
    restoreApiMock();
  });

  it('muestra la pantalla de carga mientras resuelve el bootstrap', async () => {
    mockBootstrapSuccess();
    mockHomeSuccess();
    mockMenuSuccess();

    render(<App />);

    expect(screen.getByText(es.loading.preparing)).toBeOnTheScreen();

    await waitFor(() =>
      expect(screen.queryByText(es.loading.preparing)).toBeNull(),
    );
  });

  it('monta las tabs que habilita el CMS tras el bootstrap', async () => {
    mockBootstrapSuccess();
    mockHomeSuccess();
    mockMenuSuccess();

    render(<App />);

    await waitFor(() => expect(screen.getByText(es.home)).toBeOnTheScreen(), {
      timeout: 10000,
    });

    expect(screen.getByText(es.menu)).toBeOnTheScreen();
  });

  it('renderiza el contenido de home que devuelve el CMS', async () => {
    mockBootstrapSuccess();
    mockHomeSuccess();
    mockMenuSuccess();

    render(<App />);

    await waitFor(
      () =>
        expect(screen.getByText('Bienvenido a Casa Maiz')).toBeOnTheScreen(),
      { timeout: 10000 },
    );
  });

  it('reutiliza la cache del QueryClient global entre montajes', async () => {
    mockBootstrapSuccess();
    mockHomeSuccess();
    mockMenuSuccess();

    const first = render(<App />);
    await waitFor(() => expect(screen.getByText(es.home)).toBeOnTheScreen(), {
      timeout: 10000,
    });
    first.unmount();

    render(<App />);

    expect(screen.queryByText(es.loading.preparing)).toBeNull();
  });
});
