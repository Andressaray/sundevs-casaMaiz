describe('store / types', () => {
  it('archivo de tipos puede ser importado', () => {
    // Importar sin errores
    expect(() => require('@/store/types')).not.toThrow();
  });
});
