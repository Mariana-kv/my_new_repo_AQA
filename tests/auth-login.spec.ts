//import { test, expect } from '@playwright/test';
//import { LoginPage } from '../pages/login.page';
//import { AccountPage } from '../pages/account.page';
import { test } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();
console.log('EMAIL:', process.env.USER_EMAIL);
console.log('PASSWORD:', process.env.USER_PASSWORD);
console.log('BASE_URL:', process.env.BASE_URL);
import path from 'path';
interface LoginResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

// test('Login and save session', async ({ page }) => {
//   const loginPage = new LoginPage(page);
//   const accountPage = new AccountPage(page);
//   await page.goto('/auth/login');
//   await loginPage.performLogin(process.env.USER_EMAIL ?? '', process.env.USER_PASSWORD ?? '');

//   await expect(page).toHaveURL('/account');
//   //await expect(accountPage.header.navigationMenu).toContainText('Jane Doe');
//   await expect(accountPage.header.navigationMenu).toContainText(process.env.USER_NAME ?? '');
//   await page.context().storageState({ path: authFile });

// });
test('Login and save session', async ({ request, page }) => {
  const response = await request.post('https://api.practicesoftwaretesting.com/users/login', {
    data: {
      email: process.env.USER_EMAIL,
      password: process.env.USER_PASSWORD,
    }
  });
  
  const body = await response.json() as LoginResponse;
  await page.goto('/');
  await page.evaluate((token) => {
    window.localStorage.setItem('auth-token', token);
  }, body.access_token);
  
  await page.context().storageState({ path: authFile });
});