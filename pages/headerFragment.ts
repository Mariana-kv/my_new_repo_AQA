import { Locator, Page } from "@playwright/test";

export class HeaderFragment {
    page: Page;
    navigationMenu: Locator;

    constructor(page: Page) {
        this.page = page;
        this.navigationMenu = this.page.getByTestId('nav-menu');
    }
 
}