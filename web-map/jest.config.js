module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  globalSetup: 'jest-preset-angular/global-setup',
  transformIgnorePatterns: [
    'node_modules/(?!(.*\\.mjs$|ol|observable-fns|quick-lru|nanoid))',
  ]
};
