import { Locator, Page } from "@playwright/test";
import { HeaderFragment } from "./headerFragment";

export class AccountPage {
    page: Page;
    header: HeaderFragment;
    pageTitle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.header = new HeaderFragment(page);
        this.pageTitle = this.page.getByTestId('page-title');
    }
}