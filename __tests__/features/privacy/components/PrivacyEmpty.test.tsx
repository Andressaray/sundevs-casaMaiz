import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { PrivacyEmpty } from '@features/privacy/components';
import es from '@/config/languages/es.json';

describe('features/privacy / PrivacyEmpty', () => {
  it('renderiza el componente vacio', () => {
    render(<PrivacyEmpty />);

    expect(screen.getByTestId('empty-component')).toBeOnTheScreen();
  });

  it('llama a onRetry al pulsar la accion', () => {
    const onRetry = jest.fn();
    render(<PrivacyEmpty onRetry={onRetry} />);

    fireEvent.press(screen.getByTestId('empty-component-action'));

    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('[deuda] pide `privacy_empty_title` en vez de `empty.privacy.title`', () => {
    render(<PrivacyEmpty />);

    expect(screen.getByTestId('empty-component-title')).toHaveTextContent(
      'privacy_empty_title',
    );
    expect(es.empty.privacy.title).toBe('Política de privacidad no disponible');
  });
});
