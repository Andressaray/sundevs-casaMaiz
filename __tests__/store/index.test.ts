import { useAppStore } from '@/store';

describe('store / useAppStore (zustand)', () => {
  it('arranca con tema light y lenguaje es', () => {
    const { theme, language, languages } = useAppStore.getState();

    expect(theme).toBe('light');
    expect(language).toBe('es');
    expect(languages).toEqual(['es', 'en']);
  });

  it('setTheme cambia el tema', () => {
    useAppStore.getState().setTheme('dark');
    expect(useAppStore.getState().theme).toBe('dark');
  });

  it('setLanguage cambia el idioma', () => {
    useAppStore.getState().setLanguage('en');
    expect(useAppStore.getState().language).toBe('en');
  });

  it('el estado se resetea entre tests', () => {
    expect(useAppStore.getState().theme).toBe('light');
    expect(useAppStore.getState().language).toBe('es');
  });
});
