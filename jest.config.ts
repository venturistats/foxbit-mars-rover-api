module.exports = {
  // Seus testes unitários
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'cobertura'],

  coverageThreshold: {
    global: {
      branches: 60,
      functions: 60,
      lines: 60,
      statements: 60,
    },
  },
  testMatch: [
    '**/*.spec.ts', // Unit tests
    '**/*.int-spec.ts', // Integration tests
  ],
};
