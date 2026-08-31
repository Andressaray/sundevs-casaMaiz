import type { HomeState } from '@/features/home/types/home.types';

describe('features/home/types / home.types', () => {
  it('exporta tipos sin errores', () => {
    // Verificar que los tipos están disponibles
    const state: HomeState = {
      pages: [],
      error: null,
      isLoading: false,
    };
    expect(state).toBeDefined();
  });
});
