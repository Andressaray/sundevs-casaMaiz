module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@': './src',
          '@services': './src/services',
          '@features': './src/features',
          '@components': './src/components',
          '@config': './src/config',
          '@hooks': './src/hooks',
          '@utils': './src/utils',
          '@types': './src/types',
          '@assets': './src/assets',
          '@styles': './src/styles',
          '@navigation': './src/navigation',
          '@screens': './src/screens',
          '@models': './src/models',
          '@store': './src/store',
          '@context': './src/context',
        },
        extensions: ['.ios.js', '.android.js', '.js', '.jsx', '.json', '.ts', '.tsx'],
      },
    ],
  ],
};
