import type { NavigationItem } from '@/types/types';

describe('types / types', () => {
  it('exporta tipos sin errores', () => {
    // Verificar que los tipos están disponibles
    const item: NavigationItem = {
      label: 'Test',
      href: 'test',
    };
    expect(item).toBeDefined();
  });
});
