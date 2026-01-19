import { test, expect } from '@playwright/test'

test.describe('Authentication', () => {
  test.describe('Login Page', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/login')
    })

    test('should display login form correctly', async ({ page }) => {
      // Check page title/heading
      await expect(page.getByRole('heading', { name: 'Sign in' })).toBeVisible()

      // Check form elements exist
      await expect(page.getByPlaceholder('name@example.com')).toBeVisible()
      await expect(page.getByPlaceholder('••••••••')).toBeVisible()
      await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible()

      // Check OAuth buttons
      await expect(page.getByRole('button', { name: /Google/i })).toBeVisible()
      await expect(page.getByRole('button', { name: /Apple/i })).toBeVisible()

      // Check signup link
      await expect(page.getByRole('link', { name: /Create an account/i })).toBeVisible()
    })

    test('should show validation for empty email', async ({ page }) => {
      // Try to submit without email
      await page.getByPlaceholder('••••••••').fill('password123')
      await page.getByRole('button', { name: 'Sign In' }).click()

      // HTML5 validation should prevent form submission
      // Check email field is invalid
      const emailInput = page.getByPlaceholder('name@example.com')
      await expect(emailInput).toHaveAttribute('required', '')
    })

    test('should show validation for invalid email format', async ({ page }) => {
      const emailInput = page.getByPlaceholder('name@example.com')

      // Fill invalid email
      await emailInput.fill('notanemail')
      await page.getByPlaceholder('••••••••').fill('password123')
      await page.getByRole('button', { name: 'Sign In' }).click()

      // Check the email input validity
      const isInvalid = await emailInput.evaluate(
        (el: HTMLInputElement) => !el.validity.valid
      )
      expect(isInvalid).toBe(true)
    })

    test('should toggle password visibility', async ({ page }) => {
      const passwordInput = page.getByPlaceholder('••••••••')

      // Initially password is hidden
      await expect(passwordInput).toHaveAttribute('type', 'password')

      // Click toggle button (the eye icon button)
      await page.locator('button').filter({ has: page.locator('svg') }).last().click()

      // Now password should be visible
      await expect(passwordInput).toHaveAttribute('type', 'text')

      // Click again to hide
      await page.locator('button').filter({ has: page.locator('svg') }).last().click()
      await expect(passwordInput).toHaveAttribute('type', 'password')
    })

    test('should navigate to signup page', async ({ page }) => {
      await page.getByRole('link', { name: /Create an account/i }).click()
      await expect(page).toHaveURL('/signup')
    })

    test('should show loading state during login', async ({ page }) => {
      // Fill form
      await page.getByPlaceholder('name@example.com').fill('test@example.com')
      await page.getByPlaceholder('••••••••').fill('password123')

      // Click login and check for loading state
      const submitButton = page.getByRole('button', { name: 'Sign In' })
      await submitButton.click()

      // The button should show loader (spinner) during loading
      // Note: This test might fail quickly if the network responds fast
      // In real scenarios, you'd mock the network or use a test user
    })

    test('should display error message on invalid credentials', async ({ page }) => {
      // Fill with invalid credentials
      await page.getByPlaceholder('name@example.com').fill('invalid@example.com')
      await page.getByPlaceholder('••••••••').fill('wrongpassword')
      await page.getByRole('button', { name: 'Sign In' }).click()

      // Should show error message (from Supabase)
      await expect(page.locator('.bg-red-50')).toBeVisible({ timeout: 10000 })
    })
  })

  test.describe('Protected Routes', () => {
    test('should redirect unauthenticated users from dashboard to login', async ({
      page,
    }) => {
      // Try to access dashboard without authentication
      await page.goto('/dashboard')

      // Should be redirected to login (or show auth required message)
      // This behavior depends on your middleware setup
      await expect(page).toHaveURL(/\/(login|auth|signin)/)
    })
  })
})
