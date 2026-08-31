import { Platform } from 'react-native';
import { waitFor } from '@testing-library/react-native';
import useGetHomeData from '@features/home/hooks/useHomeData';
import { renderHookWithProviders } from '@tests/utils';
import { getLastRequest, restoreApiMock } from '@tests/__mocks__/api.mock';
import { mockGetError, mockHomeSuccess } from '@tests/__mocks__/handlers.mock';
import { APP_VERSION } from '@config/constants';

describe('features/home / useGetHomeData', () => {
  afterAll(() => {
    restoreApiMock();
  });

  it('devuelve el shape acordado por RULES §7.3', async () => {
    mockHomeSuccess();

    const { result } = renderHookWithProviders(() => useGetHomeData());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(Object.keys(result.current).sort()).toEqual([
      'data',
      'error',
      'isError',
      'isLoading',
      'isRefetching',
      'refetch',
    ]);
  });

  it('carga el layout de home', async () => {
    mockHomeSuccess();

    const { result } = renderHookWithProviders(() => useGetHomeData());

    await waitFor(() => expect(result.current.data).toBeDefined());

    expect(result.current.data?.data.slug).toBe('home');
  });

  it('arma el contexto de request con Platform.OS y APP_VERSION', async () => {
    mockHomeSuccess();

    const { result } = renderHookWithProviders(() => useGetHomeData());

    await waitFor(() => expect(result.current.data).toBeDefined());

    expect(getLastRequest().params).toEqual({
      platform: Platform.OS,
      market: 'MX',
      audience: 'guest',
      appVersion: APP_VERSION,
    });
  });

  it('expone el error cuando el CMS falla', async () => {
    mockGetError('/pages/home', 500);

    const { result } = renderHookWithProviders(() => useGetHomeData());

    await waitFor(() => expect(result.current.error).toBeTruthy(), {
      timeout: 10000,
    });

    expect(result.current.data).toBeUndefined();
  });
});
