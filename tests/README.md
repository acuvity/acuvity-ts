# Unit Tests Guide

This document provides instructions for running unit tests in this project.

## Prerequisites

Ensure you have the following installed:
- Node.js (v14 or higher)
- npm packages:
  ```bash
  npm install --save-dev jest @types/jest ts-jest typescript
  ```

## Running Tests

### NOTE: `Run all the npx commands from the root dir: acuivty-ts`.

### Direct CLI Commands

1. Run all tests:
```bash
npx jest
```

2. Run a specific test file:
```bash
npx jest tests/guard/config.test.ts
```

3. Run tests matching a specific name pattern:
```bash
npx jest -t "Match"  # Runs all tests with "Match" in the name
```

### Watch Mode

Run tests in watch mode (automatically reruns on file changes):
```bash
npx jest --watch tests/guard/config.test.ts
```

### Useful CLI Options

- `--verbose`: Show detailed test output
  ```bash
  npx jest tests/guard/config.test.ts --verbose
  ```

- `--coverage`: Generate test coverage report
  ```bash
  npx jest --coverage
  ```

- Run a specific test suite and test:
  ```bash
  npx jest tests/guard/config.test.ts -t "should create a Match instance"
  ```

## Test File Structure

Tests are located in the `tests` directory, mirroring the source code structure:
```
acuvity-ts/
├── src/
│   └── guard/
│       └── config.ts
├── tests/
│   └── guard/
│       └── config.test.ts
```

## Writing Tests

Basic test structure:
```typescript
describe('Component/Class Name', () => {
    test('should do something specific', () => {
        // Test implementation
    });
});
```

## Debugging Tests

1. Run a single test with detailed output:
```bash
npx jest tests/guard/config.test.ts -t "specific test name" --verbose
```


## Common Issues and Solutions

1. Module Resolution Issues:
   - Check import paths are correct
   - Verify tsconfig.json settings
   - Make sure jest.config.js is properly configured

2. Test Not Found:
   - Ensure test file names end with `.test.ts`
   - Check test pattern matching in CLI command

## Additional Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [ts-jest Documentation](https://kulshekhar.github.io/ts-jest/)
