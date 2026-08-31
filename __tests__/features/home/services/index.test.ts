import HomeService from '@features/home/services';
import { getLastRequest, restoreApiMock } from '@tests/__mocks__/api.mock';
import { mockGetError, mockHomeSuccess } from '@tests/__mocks__/handlers.mock';
import { homePageFixture } from '@tests/fixtures/page.fixture';
import type { ApiRequest } from '@/types/types';

const request: ApiRequest = {
  platform: 'ios',
  market: 'MX',
  audience: 'guest',
  appVersion: '1.0.1',
};

describe('features/home / HomeService', () => {
  afterAll(() => {
    restoreApiMock();
  });

  it('apunta a /pages/home', () => {
    expect(new HomeService().baseUrl).toBe('/pages/home');
  });

  it('devuelve el layout de la pagina', async () => {
    mockHomeSuccess();

    const result = await new HomeService().getHomeService(request);

    expect(result).toEqual(homePageFixture);
    expect(result.data.layout.length).toBeGreaterThan(0);
  });

  it('envia el contexto de request como params', async () => {
    mockHomeSuccess();

    await new HomeService().getHomeService(request);

    expect(getLastRequest().params).toEqual(request);
  });

  it('propaga el error del CMS', async () => {
    mockGetError('/pages/home', 500);

    await expect(
      new HomeService().getHomeService(request),
    ).rejects.toMatchObject({ response: { status: 500 } });
  });
});
