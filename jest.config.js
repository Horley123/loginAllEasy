module.exports = {
  preset: 'react-native',
  setupFiles: ['./jest.setupFiles.js'], // 👈 necessário para mocks NATIVOS
  setupFilesAfterEnv: ['./jest.setupAfterEnv.js'], // 👈 para matchers e libs utilitárias
  transform: {
    '^.+\\.[jt]sx?$': require.resolve('babel-jest'),
  },
  testEnvironment: 'jsdom',
  transformIgnorePatterns: [
    'node_modules/(?!(react-native' +
      '|@react-native' +
      '|@react-navigation' +
      '|@gluestack-ui' +
      '|@legendapp/motion' +
      '|@expo/html-elements' +
      '|react-native-reanimated' +
      '|react-native-svg' +
      '|@hookform' +
      '|yup' +
      '|@expo/vector-icons' +
      '|expo-linear-gradient' +
      '|expo-constants' +
      '|react-native-vector-icons' +
      ')/)',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/index.ts',
    '!src/routes/**',
    '!src/store/**',
    '!src/dtos/**',
    '!src/assets/**',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
