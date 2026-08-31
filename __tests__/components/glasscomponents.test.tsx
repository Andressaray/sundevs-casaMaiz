import React from 'react';
import { render } from '@testing-library/react-native';
import {
  GlassCard,
  GlassButton,
  GlassContainer,
  GlassInput,
  GlassBadge,
} from '@/components/glasscomponents';

describe('components / GlassComponents', () => {
  describe('GlassCard', () => {
    it('renderiza sin errors', () => {
      const { toJSON } = render(<GlassCard>Test</GlassCard>);
      expect(toJSON()).toBeDefined();
    });
  });

  describe('GlassButton', () => {
    it('renderiza sin errors', () => {
      const { toJSON } = render(<GlassButton>Presionar</GlassButton>);
      expect(toJSON()).toBeDefined();
    });
  });

  describe('GlassContainer', () => {
    it('renderiza sin errors', () => {
      const { toJSON } = render(<GlassContainer>Test</GlassContainer>);
      expect(toJSON()).toBeDefined();
    });
  });

  describe('GlassInput', () => {
    it('renderiza sin errors', () => {
      const { toJSON } = render(<GlassInput />);
      expect(toJSON()).toBeDefined();
    });
  });

  describe('GlassBadge', () => {
    it('renderiza sin errors', () => {
      const { toJSON } = render(<GlassBadge>Test</GlassBadge>);
      expect(toJSON()).toBeDefined();
    });
  });
});
