import { act, waitFor } from '@testing-library/react-native';
import usePageData from '@/hooks/usePageData';
import { renderHookWithProviders } from '@tests/utils';
import { buildPageResponse } from '@tests/fixtures/page.fixture';

describe('hooks / usePageData', () => {
  it('devuelve siempre el mismo shape', async () => {
    const fetchFn = jest.fn().mockResolvedValue(buildPageResponse());

    const { result } = renderHookWithProviders(() =>
      usePageData({ queryKey: ['page-shape'], fetchFn }),
    );

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

  it('expone los datos del CMS tras la carga', async () => {
    const response = buildPageResponse();
    const fetchFn = jest.fn().mockResolvedValue(response);

    const { result } = renderHookWithProviders(() =>
      usePageData({ queryKey: ['page-ok'], fetchFn }),
    );

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.data).toBeDefined());

    expect(result.current.data?.data.slug).toBe('home');
    expect(result.current.error).toBeNull();
    expect(fetchFn).toHaveBeenCalled();
  });

  it('expone el error cuando el fetch falla', async () => {
    const fetchFn = jest.fn().mockRejectedValue(new Error('CMS caido'));

    const { result } = renderHookWithProviders(() =>
      usePageData({ queryKey: ['page-error'], fetchFn, retry: 0 }),
    );

    await waitFor(() => expect(result.current.error).toBeTruthy());

    expect(result.current.error?.message).toBe('CMS caido');
    expect(result.current.data).toBeUndefined();
  });

  it('refetch vuelve a llamar al fetchFn', async () => {
    const fetchFn = jest.fn().mockResolvedValue(buildPageResponse());

    const { result } = renderHookWithProviders(() =>
      usePageData({ queryKey: ['page-refetch'], fetchFn }),
    );

    await waitFor(() => expect(result.current.data).toBeDefined());
    const callsAfterLoad = fetchFn.mock.calls.length;

    await act(async () => {
      await result.current.refetch();
    });

    expect(fetchFn.mock.calls.length).toBeGreaterThan(callsAfterLoad);
  });

  it('respeta staleTime y cacheTime cuando no hay nextChangeAt', async () => {
    const fetchFn = jest
      .fn()
      .mockResolvedValue(buildPageResponse({ nextChangeAt: '' }));

    const { result } = renderHookWithProviders(() =>
      usePageData({
        queryKey: ['page-sin-nextchange'],
        fetchFn,
        staleTime: 1000,
        cacheTime: 2000,
      }),
    );

    await waitFor(() => expect(result.current.data).toBeDefined());

    expect(result.current.data?.data.nextChangeAt).toBe('');
  });

  it('acepta nextChangeAt en el pasado sin romper', async () => {
    const fetchFn = jest
      .fn()
      .mockResolvedValue(
        buildPageResponse({ nextChangeAt: '2020-01-01T00:00:00.000Z' }),
      );

    const { result } = renderHookWithProviders(() =>
      usePageData({ queryKey: ['page-caducada'], fetchFn }),
    );

    await waitFor(() => expect(result.current.data).toBeDefined());

    expect(result.current.data?.data.nextChangeAt).toBe(
      '2020-01-01T00:00:00.000Z',
    );
  });
});
