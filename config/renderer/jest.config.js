module.exports = {
  rootDir: './../../',
  roots: [
    '<rootDir>/src/renderer'
  ],
  collectCoverageFrom: [
    'src/renderer/**/*.{js,jsx,ts,tsx}',
    '!src/renderer/**/*.d.ts'
  ],
  setupFiles: [
    'react-app-polyfill/jsdom'
  ],
  setupFilesAfterEnv: [
    '<rootDir>/src/renderer/setupTests.ts'
  ],
  testMatch: [
    '<rootDir>/src/renderer/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/renderer/**/*.{spec,test}.{js,jsx,ts,tsx}',
  ],
  testEnvironment: 'jest-environment-jsdom-fourteen',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.css$': '<rootDir>/config/renderer/jest/cssTransform.js',
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '<rootDir>/config/renderer/jest/fileTransform.js'
  },
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$',
    '^.+\\.module\\.(css|sass|scss)$'
  ],
  modulePaths: [],
  moduleNameMapper: {
    '^react-native$': 'react-native-web',
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy'
  },
  moduleFileExtensions: [
    'web.js',
    'js',
    'web.ts',
    'ts',
    'web.tsx',
    'tsx',
    'json',
    'web.jsx',
    'jsx',
    'node'
  ],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname'
  ]
};