describe('features/notfound/types / index', () => {
  it('archivo de tipos puede ser importado', () => {
    // Importar sin errores
    expect(() => require('@/features/notfound/types/index')).not.toThrow();
  });
});
