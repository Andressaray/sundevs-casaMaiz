import PagesService from '@/services/pages/pages.service';
import {
  getApiMock,
  getLastRequest,
  restoreApiMock,
} from '@tests/__mocks__/api.mock';
import { homePageFixture } from '@tests/fixtures/page.fixture';
import type { PagesRequest } from '@/services/pages/pages.types';

const request: PagesRequest = {
  slug: 'home',
  platform: 'ios',
  market: 'MX',
  audience: 'guest',
  appVersion: '1.0.1',
};

describe('services / PagesService', () => {
  afterAll(() => {
    restoreApiMock();
  });

  it('expone /pages como baseUrl', () => {
    expect(new PagesService().baseUrl).toBe('/pages');
  });

  it('construye la url con el slug recibido', async () => {
    getApiMock().onGet('/pages/home').reply(200, homePageFixture);

    const result = await new PagesService().getDataByPage(request);

    expect(getLastRequest().url).toBe('/pages/home');
    expect(result).toEqual(homePageFixture);
  });

  it('funciona con slugs anidados', async () => {
    getApiMock()
      .onGet('/pages/legal/privacy_policy')
      .reply(200, homePageFixture);

    await new PagesService().getDataByPage({
      ...request,
      slug: 'legal/privacy_policy',
    });

    expect(getLastRequest().url).toBe('/pages/legal/privacy_policy');
  });

  it('reenvia el request completo como query params', async () => {
    getApiMock().onGet('/pages/menu').reply(200, homePageFixture);

    await new PagesService().getDataByPage({ ...request, slug: 'menu' });

    expect(getLastRequest().params).toEqual({ ...request, slug: 'menu' });
  });

  it('propaga un 404 del CMS', async () => {
    getApiMock().onGet('/pages/no-existe').reply(404, { error: 'Not found' });

    await expect(
      new PagesService().getDataByPage({ ...request, slug: 'no-existe' }),
    ).rejects.toMatchObject({ response: { status: 404 } });
  });
});
