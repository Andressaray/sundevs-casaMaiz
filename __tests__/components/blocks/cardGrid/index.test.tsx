import React from 'react';
import { render, screen } from '@testing-library/react-native';
import CardGrid from '@/components/blocks/cardGrid';
import { buildCardGridBlock } from '@tests/fixtures/blocks.fixture';

describe('components/blocks / CardGrid', () => {
  it('muestra eyebrow y titulo', () => {
    render(<CardGrid block={buildCardGridBlock()} />);

    expect(screen.getByText('Nuestra carta')).toBeOnTheScreen();
    expect(screen.getByText('Platos destacados')).toBeOnTheScreen();
  });

  it('renderiza una card por elemento con titulo, descripcion y precio', () => {
    render(<CardGrid block={buildCardGridBlock()} />);

    expect(screen.getByText('Tlayuda')).toBeOnTheScreen();
    expect(
      screen.getByText('Tortilla de maiz azul con asiento y quesillo.'),
    ).toBeOnTheScreen();
    expect(screen.getByText('$180')).toBeOnTheScreen();
    expect(screen.getByText('Mole negro')).toBeOnTheScreen();
    expect(screen.getByText('$240')).toBeOnTheScreen();
  });

  it('no rompe con una card sin imagen', () => {
    const block = buildCardGridBlock();
    block.cards[0].image = undefined as never;

    expect(() => render(<CardGrid block={block} />)).not.toThrow();
    expect(screen.getByText('Tlayuda')).toBeOnTheScreen();
  });

  it('renderiza sin cards', () => {
    render(<CardGrid block={buildCardGridBlock({ cards: [] })} />);

    expect(screen.getByText('Platos destacados')).toBeOnTheScreen();
    expect(screen.queryByText('Tlayuda')).toBeNull();
  });
});
