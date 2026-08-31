describe('services/pages / pages.types', () => {
  it('archivo de tipos puede ser importado', () => {
    // Importar sin errores
    expect(() => require('@/services/pages/pages.types')).not.toThrow();
  });
});
