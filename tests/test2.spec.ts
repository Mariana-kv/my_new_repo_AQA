
import { Category } from '../enums/category.enum';
import { test, expect } from '../fixtures/app.fixture';


test('Verify user can view product details',  { tag: '@smoke' }, async({ allPages, page }) => {

await test.step('Open homepage and navigate to product', async () => {
  await page.goto('/');
  await allPages.homePage.productLink.click();
});

await test.step('Verify product details', async () => { 
expect(page.url()).toContain('/product');
  await expect(allPages.productPage.productName).toHaveText('Combination Pliers');
  await expect(allPages.productPage.unitPrice).toContainText('14.15');
  await expect(allPages.productPage.addToCart).toBeVisible();
  await expect(allPages.productPage.addToFav).toBeVisible();
});
});


test.describe('Verify user can perform sorting by name (asc & desc)',  { tag: '@regression' }, () => {
  const cases = [
    { option: 'Name (A - Z)', order: 'asc' },
    { option: 'Name (Z - A)', order: 'desc'},
  ];

  for (const { option, order } of cases) {
    test(`Verify sorting by name: ${option}`, async ({ allPages, page }) => {
      let names: string[] = [];

      await test.step('Open the page and select sorting', async () => {
        await page.goto('/');
        await allPages.homePage.sortDropdown.selectOption(option);
        const firstProductBefore = await page.getByTestId('product-name').first().textContent();
        await expect(page.getByTestId('product-name').first()).not.toHaveText(firstProductBefore ?? '');
        names = await page.getByTestId('product-name').allTextContents();
      });

      await test.step('Verify sorting is correct', () => {
        const sorted = [...names].sort((a, b) =>
        order === 'asc' ? a.localeCompare(b) : b.localeCompare(a)
      );
      expect(names).toEqual(sorted);
      });
    });
  }
});

test.describe('Verify user can perform sorting by price (asc & desc)',  { tag: '@regression' }, () => {
  const cases = [
    { option: 'Price (Low - High)', order: 'asc' },
    { option: 'Price (High - Low)', order: 'desc' },
  ];

  for (const { option, order } of cases) {
    test(`Verify sorting by price: ${option}`, async ({ allPages, page }) => {
      let prices: number[] = [];

      await test.step('Open the page and select sorting', async () => {
        await page.goto('/');
        await allPages.homePage.sortDropdown.selectOption(option);
        const firstProductBefore = await page.getByTestId('product-price').first().textContent();
        await expect(page.getByTestId('product-price').first()).not.toHaveText(firstProductBefore ?? '');
        const priceTexts = await page.getByTestId('product-price').allTextContents();
        prices = priceTexts.map(p => parseFloat(p.replace('$', '')));
      });

      await test.step('Verify sorting is correct', () => {
       const sorted = [...prices].sort((a, b) =>
        order === 'asc' ? a - b : b - a
      );
      expect(prices).toEqual(sorted);
    });
  });
}
});

test('Verify user can filter products by category',  { tag: '@regression' }, async({ allPages, page}) => {
  let productNames: string[] = [];

  await test.step('Open the page and apply filter', async () => {
    await page.goto('/');
    await allPages.homePage.filterByCategory(Category.PowerTools, 'Sander');
    await expect(page.getByTestId('product-name').filter({ hasText: 'Combination Pliers' })).toHaveCount(0);
    productNames = await allPages.homePage.products.allTextContents();
  });

  await test.step('Verify filtered products contain Sander', () => {
    for (const name of productNames) {
      expect(name).toContain('Sander');
  }
});
});

test('Verify user logged with new user data',  { tag: '@smoke' }, async({ loggedInApp, page}) => {

  await test.step('Open account page', async () => {
    await page.goto('/account');
    await expect(page).toHaveURL('/account');
  });

  await test.step('Verify user data', async () => {
    await expect(loggedInApp.accountPage.header.navigationMenu).toContainText(process.env.USER_NAME ?? '');
  });
});

test('Verify user can confirm purchase',  { tag: '@smoke' }, async({ loggedInApp, page}) => {
  let productName: string | null = null;
  let productPrice: string | null = null;

  await test.step('Open homepage and select product', async () => {
    await page.goto('/');
     productName = await loggedInApp.homePage.products.first().textContent();
     productPrice = await page.getByTestId('product-price').first().textContent();
    await loggedInApp.homePage.products.first().click();
    });
  
  await test.step('Add to cart and verify alert', async () => {
    await loggedInApp.productPage.addToCart.click();
    await expect(loggedInApp.productPage.alert).toContainText('Product added to shopping cart');
    await expect(loggedInApp.productPage.alert).toBeHidden( {timeout: 8000} );
  });

  await test.step('Verify cart contents', async () => {
    await loggedInApp.productPage.productCart.click();
    await expect(page).toHaveURL('/checkout');
    await expect(loggedInApp.checkoutPage.productTitle).toContainText(productName ?? '');
    await expect(loggedInApp.checkoutPage.productCheckoutPrice).toContainText(productPrice ?? '');
    await expect(loggedInApp.checkoutPage.productCheckoutTotalPrice).toContainText(productPrice ?? '');
  });

  await test.step('Proceed to checkout and verify user is logged in', async () => {
    await loggedInApp.checkoutPage.proceedCheckoutBtn.click();
    await expect(page.getByText(`${process.env.USER_NAME ?? ''}, you are already logged in`)).toBeVisible();
    await expect(loggedInApp.checkoutPage.productCheckoutSuccessBtn).toBeVisible();
    await loggedInApp.checkoutPage.productCheckoutSuccessBtn.click();
  });

  await test.step('Fill billing address', async () => {
    await loggedInApp.checkoutPage.countryCheckoutPage.selectOption('Ukraine');
    await loggedInApp.checkoutPage.postalCodeCheckoutPage.clear();
    await loggedInApp.checkoutPage.postalCodeCheckoutPage.fill('46000');
    await loggedInApp.checkoutPage.houseNumberCheckoutPage.clear();
    await loggedInApp.checkoutPage.houseNumberCheckoutPage.fill('23');
    await loggedInApp.checkoutPage.addressCheckoutPageProceedBtn.click();
  });

  await test.step('Fill payment details', async () => {
    await loggedInApp.checkoutPage.cardCheckoutPage.selectOption('Credit Card');
    await loggedInApp.checkoutPage.cardNumberCheckoutPage.fill('1111-1111-1111-1111');

    const date = new Date();
    date.setMonth(date.getMonth() + 3);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear());
    const expirationDate = `${month}/${year}`;
    await loggedInApp.checkoutPage.expirationDateCheckoutPage.fill(expirationDate);

    await loggedInApp.checkoutPage.cvvCheckoutPage.fill('111');
    await loggedInApp.checkoutPage.cardNameCheckoutPage.fill('Mariana K');
    await loggedInApp.checkoutPage.confirmBtnCheckoutPage.click();
  });

  await test.step('Verify payment success', async () => {
    await expect (loggedInApp.checkoutPage.successCheckoutPage).toBeVisible();
    await expect (loggedInApp.checkoutPage.successCheckoutPage).toHaveText('Payment was successful');
  });
});
