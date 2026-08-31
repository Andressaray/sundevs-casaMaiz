import React from 'react';
import { render, screen } from '@testing-library/react-native';
import TextBlock from '@/components/blocks/textBlock';
import { buildTextBlock } from '@tests/fixtures/blocks.fixture';

describe('components/blocks / TextBlock', () => {
  it('muestra eyebrow, heading y body', () => {
    render(<TextBlock block={buildTextBlock()} />);

    expect(screen.getByText('Nuestra historia')).toBeOnTheScreen();
    expect(screen.getByText('Del comal a la mesa')).toBeOnTheScreen();
    expect(
      screen.getByText('Nixtamalizamos nuestro maiz cada manana.'),
    ).toBeOnTheScreen();
  });

  it('oculta el eyebrow cuando no viene del CMS', () => {
    render(<TextBlock block={buildTextBlock({ eyebrow: undefined })} />);

    expect(screen.queryByText('Nuestra historia')).toBeNull();
    expect(screen.getByText('Del comal a la mesa')).toBeOnTheScreen();
  });

  it.each(['left', 'center', 'right'] as const)(
    'aplica la alineacion %s que envia el CMS',
    (alignment) => {
      render(<TextBlock block={buildTextBlock({ alignment })} />);

      expect(screen.getByText('Del comal a la mesa')).toHaveStyle({
        textAlign: alignment,
      });
    },
  );
});
