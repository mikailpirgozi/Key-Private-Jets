# Testing Guide

## Overview

This project uses a comprehensive testing strategy:
- **Unit Tests**: Vitest for utility functions and components
- **Integration Tests**: API route testing
- **E2E Tests**: Playwright for user flows
- **Performance Tests**: Lighthouse audits
- **Accessibility Tests**: Axe-core

## Running Tests

### Unit Tests
```bash
pnpm test                # Run all unit tests
pnpm test:ui             # Run with UI
pnpm test:coverage       # Generate coverage report
```

### E2E Tests
```bash
pnpm test:e2e            # Run all E2E tests
pnpm test:e2e:ui         # Run with UI
```

### All Tests
```bash
pnpm test:all            # Run all tests
```

## Test Coverage Goals

- **Unit Tests**: 80%+ coverage
- **Integration Tests**: All API routes
- **E2E Tests**: Critical user flows
- **Performance**: Lighthouse score 80+
- **Accessibility**: Zero violations

## Writing Tests

### Unit Test Example
```typescript
import { describe, it, expect } from 'vitest'
import { myFunction } from '@/lib/utils'

describe('myFunction', () => {
  it('does something', () => {
    expect(myFunction()).toBe(expected)
  })
})
```

### E2E Test Example
```typescript
import { test, expect } from '@playwright/test'

test('user can submit form', async ({ page }) => {
  await page.goto('/')
  await page.fill('input[name="email"]', 'test@example.com')
  await page.click('button[type="submit"]')
  await expect(page.getByText('Success')).toBeVisible()
})
```

## CI/CD Integration

Tests run automatically on:
- Every pull request
- Before deployment
- Nightly for full suite

## Debugging Failed Tests

1. Check test output for error messages
2. Review screenshots (E2E tests only)
3. Run tests with UI: `pnpm test:ui` or `pnpm test:e2e:ui`
4. Check browser console logs
5. Verify environment variables

## Test Structure

```
tests/
├── setup.ts                    # Test setup and configuration
├── unit/                       # Unit tests
│   ├── utils.test.ts          # Utility function tests
│   ├── validations.test.ts    # Schema validation tests
│   └── seo.test.ts            # SEO function tests
├── e2e/                       # End-to-end tests
│   ├── homepage.spec.ts       # Homepage tests
│   ├── quote-form.spec.ts     # Quote form tests
│   └── route-pages.spec.ts    # Route page tests
├── accessibility/             # Accessibility tests
│   └── a11y.test.ts          # Axe-core tests
└── README.md                  # This file
```

## Best Practices

1. **Write tests first** for new features (TDD)
2. **Keep tests isolated** - no dependencies between tests
3. **Use descriptive names** - test names should explain what they test
4. **Mock external dependencies** - don't make real API calls
5. **Test edge cases** - not just happy paths
6. **Keep tests fast** - unit tests should run in milliseconds
7. **Clean up after tests** - use afterEach hooks

## Common Issues

### Tests failing locally but passing in CI
- Check environment variables
- Verify Node.js version matches CI
- Clear cache: `pnpm test --clearCache`

### E2E tests timing out
- Increase timeout in playwright.config.ts
- Check if dev server is running
- Verify network connectivity

### Coverage not meeting goals
- Identify untested code: `pnpm test:coverage`
- Add tests for critical paths first
- Don't aim for 100% - focus on important code

