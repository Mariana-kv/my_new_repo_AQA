import { test as base } from '@playwright/test';
import { AllPages } from '../pages/app';

type MyFixtures = {
    allPages: AllPages;
    loggedInApp: AllPages;
};

export const test = base.extend<MyFixtures>({
    allPages: async ( {page}, use) => {
        const allPages = new AllPages(page);
        await use(allPages);
    },
    loggedInApp: async ( {allPages, page}, use) => {
        await page.goto('/auth/login');
        await allPages.loginPage.performLogin('customer2@practicesoftwaretesting.com', 'welcome01');
        await page.waitForURL('/account');
        await use(allPages);
    }
});

export { expect } from '@playwright/test';
