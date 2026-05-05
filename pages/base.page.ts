import { Locator, Page } from "@playwright/test";

export class BasePage {
  page: Page;
  alert: Locator;

  constructor(page: Page) {
    this.page = page;
    this.alert = this.page.getByRole('alert');
  }
}