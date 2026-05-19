import { test as base } from '@playwright/test';
import { AllPages } from '../pages/app';

type MyFixtures = {
    allPages: AllPages;
    loggedInApp: AllPages;
};

interface LoginResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}


export const test = base.extend<MyFixtures>({
    allPages: async ( {page}, use) => {
        const allPages = new AllPages(page);
        await use(allPages);
    },
   /*  loggedInApp: async ( {allPages, page}, use) => {
        await page.goto('/auth/login');
        await allPages.loginPage.performLogin('customer2@practicesoftwaretesting.com', 'welcome01');
        await page.waitForURL('/account');
        await use(allPages);
    } */ 

    loggedInApp: async ({ allPages, page, request }, use) => {
        const response = await request.post('https://api.practicesoftwaretesting.com/users/login', {
            data: {
                email: process.env.USER_EMAIL,
                password: process.env.USER_PASSWORD
            }
        });

        const body = await response.json() as LoginResponse;
        await page.addInitScript((token) => {
            window.localStorage.setItem('auth-token', token);
        }, body.access_token);
        await page.goto('/');
        await use(allPages);
    }

});

export { expect } from '@playwright/test';
