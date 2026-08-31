import { APP_VERSION, FONTS } from '@config/constants';

describe('config / constants', () => {
  it('APP_VERSION tiene formato semver', () => {
    expect(APP_VERSION).toMatch(/^\d+\.\d+\.\d+$/);
  });

  it('FONTS expone las cuatro variantes de Poppins', () => {
    expect(FONTS).toEqual({
      bold: 'Poppins-Bold',
      regular: 'Poppins-Regular',
      medium: 'Poppins-Medium',
      semiBold: 'Poppins-SemiBold',
    });
  });
});
