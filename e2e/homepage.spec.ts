import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should load homepage successfully', async ({ page }) => {
    // Check the page loads without errors
    await expect(page).toHaveTitle(/Abrora|Yours Truly/i)
  })

  test('should have navigation elements', async ({ page }) => {
    // Check for main navigation/header
    const header = page.locator('header').first()
    await expect(header).toBeVisible()
  })

  test('should have login/signup links', async ({ page }) => {
    // Look for authentication links
    const loginLink = page.getByRole('link', { name: /login|sign in/i })
    const signupLink = page.getByRole('link', { name: /signup|sign up|get started/i })

    // At least one should exist
    const hasLoginLink = await loginLink.count() > 0
    const hasSignupLink = await signupLink.count() > 0

    expect(hasLoginLink || hasSignupLink).toBe(true)
  })

  test('should be responsive', async ({ page }) => {
    // Desktop viewport
    await page.setViewportSize({ width: 1280, height: 720 })
    await expect(page.locator('body')).toBeVisible()

    // Tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 })
    await expect(page.locator('body')).toBeVisible()

    // Mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await expect(page.locator('body')).toBeVisible()
  })
})
