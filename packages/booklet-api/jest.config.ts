/* eslint-disable */
export default {
  displayName: 'booklet-api',
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  // coverageDirectory: '../../coverage/packages/booklet-api',

  clearMocks: true,
  // collectCoverage: true,
  // coverageProvider: "v8",
};
