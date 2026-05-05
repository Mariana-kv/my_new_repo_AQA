import { Locator, Page } from "@playwright/test";

export class CheckoutPage {
    page: Page;
    productQuantity: Locator;
    productTitle: Locator;
    proceedCheckoutBtn: Locator;
   


    constructor(page: Page) {
        this.page = page;
        this.productQuantity = this.page.getByTestId('product-quantity');
        this.productTitle = this.page.getByTestId('product-title');
        this.proceedCheckoutBtn = this.page.getByTestId('proceed-1');

    }
}