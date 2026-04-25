import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { AccountPage } from '../pages/account.page';
import { HomePage } from '../pages/home.page';

test('Verify data on the page', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const accountPage = new AccountPage(page);
  await page.goto('/auth/login');
  await loginPage.performLogin('customer@practicesoftwaretesting.com', 'welcome01');

  await expect(page).toHaveURL('/account');
  await expect(accountPage.pageTitle).toHaveText('My account');
  await expect(accountPage.header.navigationMenu).toContainText('Jane Doe');

});

test('Verify user can view product details', async({ page }) => {
  const homePage = new HomePage(page);
  await page.goto('/');
  await homePage.productLink.click();

  expect(page.url()).toContain('/product');
  await expect(homePage.productName).toHaveText('Combination Pliers');
  await expect(homePage.unitPrice).toContainText('14.15');
  await expect(homePage.addToCart).toBeVisible();
  await expect(homePage.addToFav).toBeVisible();
});