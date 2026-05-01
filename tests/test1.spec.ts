import { test, expect } from '@playwright/test';
import { AccountPage } from '../pages/account.page';
import { HomePage } from '../pages/home.page';
import { ProductPage } from '../pages/product.page';
import { CheckoutPage } from '../pages/checkout.page';
import path from 'path';
import { Category } from '../enums/category.enum';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

test.use({storageState: authFile});

test('Verify data on the page', async ({ page }) => {
  const accountPage = new AccountPage(page);
  await page.goto('/account');

  await expect(page).toHaveURL('/account');
  await expect(accountPage.pageTitle).toHaveText('My account');
  await expect(accountPage.header.navigationMenu).toContainText('Jack Howe');

});

test('Verify user can view product details', async({ page }) => {
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);
  await page.goto('/');
  await homePage.productLink.click();

  expect(page.url()).toContain('/product');
  await expect(productPage.productName).toHaveText('Combination Pliers');
  await expect(productPage.unitPrice).toContainText('14.15');
  await expect(productPage.addToCart).toBeVisible();
  await expect(productPage.addToFav).toBeVisible();
});

test('Verify user can add product to cart', async({ page}) => {
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);
  const checkoutPage = new CheckoutPage(page);
  await page.goto('/');

  await homePage.products
    .filter({ hasText: 'Slip Joint Pliers'})
    .click();

  await expect(page).toHaveURL(/\/product\//);
  await expect(productPage.productName).toHaveText('Slip Joint Pliers');
  await expect(productPage.unitPrice).toContainText('9.17');

  await productPage.addToCart.click();

  const alert = page.getByRole('alert');
  await expect(alert).toBeVisible({ timeout: 10000 });
  await expect(alert).toContainText('Product added to shopping cart');
  await expect(alert).toBeHidden( {timeout: 8000} );
  await expect(page.getByTestId('cart-quantity')).toContainText('1');

  await productPage.productCart.click();
  await expect(page).toHaveURL('/checkout');
  await expect(checkoutPage.productQuantity).toHaveValue('1');
  await expect(checkoutPage.productTitle).toContainText('Slip Joint Pliers');
  await expect(checkoutPage.proceedCheckoutBtn).toBeVisible();

});

test.describe('Verify user can perform sorting by name (asc & desc)', () => {
  const cases = [
    { option: 'Name (A - Z)', order: 'asc' },
    { option: 'Name (Z - A)', order: 'desc'},
  ];

  for (const { option, order } of cases) {
    test(`Verify sorting by name: ${option}`, async ({ page }) => {
      await page.goto('/');

      await page.getByTestId('sort').selectOption(option);

      const names = await page.getByTestId('product-name').allTextContents();

      const sorted = [...names].sort((a, b) =>
        order === 'asc' ? a.localeCompare(b) : b.localeCompare(a)
      );

      expect(names).toEqual(sorted);
    });
  }
});


test.describe('Verify user can perform sorting by price (asc & desc)', () => {
  const cases = [
    { option: 'Price (Low - High)', order: 'asc' },
    { option: 'Price (High - Low)', order: 'desc' },
  ];

  for (const { option, order } of cases) {
    test(`Verify sorting by price: ${option}`, async ({ page }) => {
      await page.goto('/');

      await page.getByTestId('sort').selectOption(option);

      const priceTexts = await page.getByTestId('product-price').allTextContents();

      const prices = priceTexts.map(p => parseFloat(p.replace('$', '')));

      const sorted = [...prices].sort((a, b) =>
        order === 'asc' ? a - b : b - a
      );

      expect(prices).toEqual(sorted);
    });
  }
});

test('Verify user can filter products by category', async({ page}) => {
  const homePage = new HomePage(page);
  await page.goto('/');

  await homePage.categoryCheckbox(Category.PowerTools, 'Sander').click();
  await expect(page.getByTestId('product-name').filter({ hasText: 'Combination Pliers' })).toHaveCount(0);  
  const productNames = await page.getByTestId('product-name').allTextContents();
  for (const name of productNames) {
    expect(name).toContain('Sander');
  }
});