import React from 'react';
import { render, screen } from '@testing-library/react-native';
import Carousel from '@/components/blocks/carousel';
import { buildCarouselBlock } from '@tests/fixtures/blocks.fixture';

describe('components/blocks / Carousel', () => {
  it('muestra el titulo del bloque', () => {
    render(<Carousel block={buildCarouselBlock()} />);

    expect(screen.getByText('El restaurante')).toBeOnTheScreen();
  });

  it('renderiza todos los slides', () => {
    render(<Carousel block={buildCarouselBlock()} />);

    expect(screen.getByText('La barra')).toBeOnTheScreen();
    expect(screen.getByText('El comedor')).toBeOnTheScreen();
  });

  it('renderiza sin slides', () => {
    render(<Carousel block={buildCarouselBlock({ slides: [] })} />);

    expect(screen.getByText('El restaurante')).toBeOnTheScreen();
    expect(screen.queryByText('La barra')).toBeNull();
  });
});
