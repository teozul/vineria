module.exports = {
    preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.vue$': '@vue/vue3-jest',
      '^.+\\.(ts|tsx)$': 'ts-jest'
    },
    moduleFileExtensions: ['vue', 'js', 'ts'],
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',
    },
    collectCoverage: true,
    collectCoverageFrom: [
      'src/**/*.{ts,vue}',
      '!src/main.ts', 
      '!src/router/index.ts',
      '!**/node_modules/**'
    ],
    testMatch: [
      '**/tests/unit/**/*.spec.[jt]s?(x)',
      '**/__tests__/*.[jt]s?(x)'
    ]
  };
