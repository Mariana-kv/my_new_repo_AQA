import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { AccountPage } from '../pages/account.page';

import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

test('Login and save session', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const accountPage = new AccountPage(page);
  await page.goto('/auth/login');
  await loginPage.performLogin('customer2@practicesoftwaretesting.com', 'welcome01');

  await expect(page).toHaveURL('/account');
  //await expect(accountPage.header.navigationMenu).toContainText('Jane Doe');
  await expect(accountPage.header.navigationMenu).toContainText('Jack Howe');
  await page.context().storageState({ path: authFile });

});
