import React from 'react';
import { Text } from 'react-native';
import { render, screen } from '@testing-library/react-native';
import Container from '@/ui/shared/container';
import { COLORS } from '@/theme/colors';

describe('ui/shared / Container', () => {
  it('renderiza a sus hijos', () => {
    render(
      <Container>
        <Text>contenido</Text>
      </Container>,
    );

    expect(screen.getByText('contenido')).toBeOnTheScreen();
  });

  it('aplica el fondo del tema', () => {
    const { toJSON } = render(
      <Container>
        <Text>contenido</Text>
      </Container>,
    );

    expect(JSON.stringify(toJSON())).toContain(COLORS.light.bgPrimary);
  });

  it('renderiza sin hijos', () => {
    const { toJSON } = render(<Container />);

    expect(toJSON()).toBeTruthy();
  });
});
