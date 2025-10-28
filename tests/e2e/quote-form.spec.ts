import { test, expect } from '@playwright/test'

test.describe('Quote Form Submission', () => {
  test('submits valid quote request', async ({ page }) => {
    await page.goto('http://localhost:3000')

    // Fill out form
    await page.fill('input[name="name"]', 'John Doe')
    await page.fill('input[name="email"]', 'john@example.com')
    await page.fill('input[name="phone"]', '5551234567')
    
    // Select cities
    await page.selectOption('select[name="from_city"]', 'NYC')
    await page.selectOption('select[name="to_city"]', 'MIA')
    
    // Select date (future date)
    await page.fill('input[name="date"]', '2025-12-25')
    
    // Select passengers
    await page.fill('input[name="passengers"]', '4')
    
    // Accept GDPR
    await page.check('input[name="gdpr_consent"]')
    
    // Submit form
    await page.click('button[type="submit"]')
    
    // Wait for success message
    await expect(page.getByText(/Thank you/i)).toBeVisible({ timeout: 10000 })
  })

  test('shows validation errors for invalid data', async ({ page }) => {
    await page.goto('http://localhost:3000')

    // Submit empty form
    await page.click('button[type="submit"]')
    
    // Should show validation errors
    await expect(page.getByText(/required/i)).toBeVisible()
  })

  test('validates email format', async ({ page }) => {
    await page.goto('http://localhost:3000')

    await page.fill('input[name="email"]', 'invalid-email')
    await page.click('button[type="submit"]')
    
    await expect(page.getByText(/invalid email/i)).toBeVisible()
  })

  test('requires GDPR consent', async ({ page }) => {
    await page.goto('http://localhost:3000')

    // Fill all fields except GDPR
    await page.fill('input[name="name"]', 'John Doe')
    await page.fill('input[name="email"]', 'john@example.com')
    await page.fill('input[name="phone"]', '5551234567')
    await page.selectOption('select[name="from_city"]', 'NYC')
    await page.selectOption('select[name="to_city"]', 'MIA')
    await page.fill('input[name="date"]', '2025-12-25')
    await page.fill('input[name="passengers"]', '4')
    
    // Don't check GDPR
    await page.click('button[type="submit"]')
    
    await expect(page.getByText(/privacy policy/i)).toBeVisible()
  })
})

