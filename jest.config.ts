export default {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    // process `*.tsx` files with `ts-jest`
  },
  moduleNameMapper: {
    '\\.(gif|ttf|eot|svg|png|jpg|jpeg)$':
      '<rootDir>/src/tests/mocks/fileMock.js',
    '^.+\\.(css|less|scss|sass)$': '<rootDir>/src/tests/mocks/styleMock.js',
  },
};
