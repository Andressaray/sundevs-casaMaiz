import type { Bootstrap, BootstrapPage } from '@/types/bootstrap.types';

describe('types / bootstrap.types', () => {
  it('exporta tipos sin errores', () => {
    // Verificar que los tipos están disponibles
    const bootstrap: Bootstrap = {
      pages: [],
      navigation: {
        navigationItems: [],
      },
    };
    expect(bootstrap).toBeDefined();
  });
});
