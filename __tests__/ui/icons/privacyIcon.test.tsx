import React from 'react';
import { render } from '@testing-library/react-native';
import PrivacyIcon from '@/ui/icons/privacyIcon';

describe('ui/icons / PrivacyIcon', () => {
  it('renderiza sin errors', () => {
    const { toJSON } = render(<PrivacyIcon />);
    expect(toJSON()).toBeDefined();
  });

  it('acepta props de tamaño personalizado', () => {
    const { toJSON } = render(<PrivacyIcon size={32} />);
    expect(toJSON()).toBeDefined();
  });
});
