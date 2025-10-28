import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('loads successfully', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await expect(page).toHaveTitle(/KeyPrivateJet/)
  })

  test('displays hero section', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await expect(page.locator('h1')).toBeVisible()
  })

  test('displays quote form', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await expect(page.locator('form')).toBeVisible()
  })

  test('displays popular routes', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await expect(page.getByText(/Popular Routes/i)).toBeVisible()
  })

  test('displays aircraft categories', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await expect(page.getByText(/Aircraft Categories/i)).toBeVisible()
  })

  test('navigation works', async ({ page }) => {
    await page.goto('http://localhost:3000')
    
    // Click on "About" link if exists
    const aboutLink = page.locator('a:has-text("About")')
    if (await aboutLink.count() > 0) {
      await aboutLink.first().click()
      await expect(page).toHaveURL(/\/about/)
    }
  })
})

