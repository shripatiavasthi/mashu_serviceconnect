module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@env': './config/env',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
