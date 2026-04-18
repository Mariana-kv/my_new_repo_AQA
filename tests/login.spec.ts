import { test, expect } from '@playwright/test';

test('Verify data on the page', async ({ page }) => {
  await page.goto('/auth/login');
  
  await page.getByTestId('email').fill('customer@practicesoftwaretesting.com');
  await page.getByTestId('password').fill('welcome01');
  await page.getByTestId('login-submit').click();

  await expect(page).toHaveURL('/account');
  await expect(page.getByTestId('page-title')).toHaveText('My Account');
  await expect(page.getByTestId('nav-menu')).toContainText('Jane Doe');

});