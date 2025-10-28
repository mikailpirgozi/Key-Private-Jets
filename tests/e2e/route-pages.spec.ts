import { test, expect } from '@playwright/test'

test.describe('Route Pages', () => {
  test('displays route details', async ({ page }) => {
    await page.goto('http://localhost:3000/routes/new-york-to-miami')
    
    await expect(page.locator('h1')).toContainText('New York')
    await expect(page.locator('h1')).toContainText('Miami')
  })

  test('shows pricing information', async ({ page }) => {
    await page.goto('http://localhost:3000/routes/new-york-to-miami')
    
    await expect(page.getByText(/\$/)).toBeVisible()
  })

  test('has quote form', async ({ page }) => {
    await page.goto('http://localhost:3000/routes/new-york-to-miami')
    
    await expect(page.locator('form')).toBeVisible()
  })

  test('pre-fills form with route data', async ({ page }) => {
    await page.goto('http://localhost:3000/routes/new-york-to-miami')
    
    const fromCity = await page.inputValue('select[name="from_city"]')
    const toCity = await page.inputValue('select[name="to_city"]')
    
    expect(fromCity).toBe('NYC')
    expect(toCity).toBe('MIA')
  })
})

