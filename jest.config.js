module.exports = {
  name: 'gio-design-charts',
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  // testEnvironmentOptions: {
  //   userAgent:
  //     'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.164 Safari/537.36',
  // },
  verbose: true,
  // registers babel.config.js with jest
  transform: {
    '^.+\\.js(x)?$': 'babel-jest',
    '^.+\\.mdx$': '@storybook/addon-docs/jest-transform-mdx',
    '^.+\\.ts(x)?$': 'ts-jest',
  },
  roots: ['./src'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  // explicitly include any node libs using ESM modules
  // "node_modules/?!(<ESM module here>|<another here>|<etc...>)"
  // transformIgnorePatterns: ['node_modules/?!(@gio-design\/icon)', '!(@gio-design/icon)'],
  transformIgnorePatterns: ['node_modules/@storybook/(?!(addon-docs)/)'],
  setupFiles: ['./__mocks__/canvas.js', './__mocks__/setupTests.js'],

  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|mdx)$':
      '<rootDir>/__mocks__/fileMock.js',
    'iconfont.js': '<rootDir>/__mocks__/iconMock.js',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/index.{ts,tsx}',
    '!src/**/interface?(s).ts?(x)',
    '!src/**/*.stories.{ts,tsx}',
    '!src/**/demos/**/*',
    '!src/**/__test?(s)__/*',
  ],
  coverageDirectory: './coverage/',
  // testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  testPathIgnorePatterns: ['/node_modules/', '/es/', '/lib/', '/dist/'],
};
