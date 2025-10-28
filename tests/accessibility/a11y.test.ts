import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('Accessibility', () => {
  test('homepage has no accessibility violations', async ({ page }) => {
    await page.goto('http://localhost:3000')

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze()

    expect(accessibilityScanResults.violations).toEqual([])
  })

  test('quote form is keyboard accessible', async ({ page }) => {
    await page.goto('http://localhost:3000')

    // Tab through form fields
    await page.keyboard.press('Tab')
    const firstFocusedElement = await page.evaluate(() => document.activeElement?.tagName)
    expect(['INPUT', 'SELECT', 'BUTTON', 'A']).toContain(firstFocusedElement)

    await page.keyboard.press('Tab')
    const secondFocusedElement = await page.evaluate(() => document.activeElement?.tagName)
    expect(['INPUT', 'SELECT', 'BUTTON', 'A']).toContain(secondFocusedElement)
  })

  test('all images have alt text', async ({ page }) => {
    await page.goto('http://localhost:3000')

    const images = await page.locator('img').all()

    for (const img of images) {
      const alt = await img.getAttribute('alt')
      expect(alt).toBeTruthy()
    }
  })
})

