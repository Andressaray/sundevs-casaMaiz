import {
  GlassCard,
  GlassButton,
  GlassContainer,
  GlassInput,
  GlassBadge,
} from '@/components/glasscomponents';

describe('components/shared / index exports', () => {
  it('exporta GlassCard', () => {
    expect(GlassCard).toBeDefined();
  });

  it('exporta GlassButton', () => {
    expect(GlassButton).toBeDefined();
  });

  it('exporta GlassContainer', () => {
    expect(GlassContainer).toBeDefined();
  });

  it('exporta GlassInput', () => {
    expect(GlassInput).toBeDefined();
  });

  it('exporta GlassBadge', () => {
    expect(GlassBadge).toBeDefined();
  });
});
