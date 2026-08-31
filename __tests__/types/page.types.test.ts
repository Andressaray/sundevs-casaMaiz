import type { Page, Block } from '@/types/page.types';

describe('types / page.types', () => {
  it('exporta tipos sin errores', () => {
    // Verificar que los tipos están disponibles
    const page: Page = {
      id: 'test',
      name: 'Test Page',
      slug: 'test-page',
      published: true,
      blocks: [],
    };
    expect(page).toBeDefined();
  });
});
