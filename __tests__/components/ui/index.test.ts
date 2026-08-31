import * as ui from '@/components/ui';

describe('components/ui / barrel', () => {
  it('exporta Alert', () => {
    expect(Object.keys(ui)).toEqual(['Alert']);
    expect(typeof ui.Alert).toBe('function');
  });
});
