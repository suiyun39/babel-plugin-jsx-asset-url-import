/**
 * https://jestjs.io/zh-Hans/docs/configuration
 * @type {import('ts-jest').JestConfigWithTsJest}
 */
const config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  coveragePathIgnorePatterns: ['/node_modules/', '/tests/'],
}

export default config
