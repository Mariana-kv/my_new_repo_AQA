import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { AccountPage } from '../pages/account.page';
import dotenv from 'dotenv';
dotenv.config();
console.log('EMAIL:', process.env.USER_EMAIL);
console.log('PASSWORD:', process.env.USER_PASSWORD);
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

test('Login and save session', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const accountPage = new AccountPage(page);
  await page.goto(`${process.env.BASE_URL}/auth/login`);
  await loginPage.performLogin(process.env.USER_EMAIL ?? '', process.env.USER_PASSWORD ?? '');

  await expect(page).toHaveURL('/account');
  //await expect(accountPage.header.navigationMenu).toContainText('Jane Doe');
  await expect(accountPage.header.navigationMenu).toContainText(process.env.USER_NAME ?? '');
  await page.context().storageState({ path: authFile });

});
